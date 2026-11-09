"""Découpe une image du monde (projection équirectangulaire, ex. Natural Earth II)
en tuiles WebP dans la projection du jeu Hégémonie.
Usage : python tools/make_tiles.py chemin/image.tif map  [ZMAX=4 dans l'environnement]"""
import sys, os, math, json
import numpy as np
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
S = 160.0
DEG = math.pi / 180
X0 = -math.pi * S          # bord gauche du monde (unités du jeu)
BW = 2 * math.pi * S       # largeur du monde
Y0, Y1 = -345.0, 300.0     # haut et bas de la carte du jeu
W0, TS = 1024, 512         # largeur au niveau 0, taille des tuiles
ZMAX = int(os.environ.get("ZMAX", "4"))
Q = int(os.environ.get("QUALITY", "74"))


def lat_of(y):
    return (np.arctan(np.exp(-y / S / 1.25)) - math.pi / 4) / 0.4 / DEG


def main(src_path, out):
    src = Image.open(src_path).convert("RGB")
    Ws, Hs = src.size
    print("source", Ws, "x", Hs, flush=True)
    tiles = []
    for z in range(ZMAX + 1):
        Wz = W0 * 2 ** z
        ppu = Wz / BW
        Hz = int(math.ceil((Y1 - Y0) * ppu))
        fac = max(1, int(Ws / (Wz * 1.4)))
        img = src.reduce(fac) if fac > 1 else src
        A = np.asarray(img, dtype=np.float32)
        hs, ws = A.shape[:2]
        xs = (np.arange(Wz) + 0.5) / ppu + X0
        col = ((xs / (S * DEG)) + 180) / 360 * ws - 0.5
        ys = (np.arange(Hz) + 0.5) / ppu + Y0
        row = (90 - np.clip(lat_of(ys), -89.9, 89.9)) / 180 * hs - 0.5
        c0 = np.clip(np.floor(col).astype(int), 0, ws - 1); c1 = np.clip(c0 + 1, 0, ws - 1); fc = np.clip(col - c0, 0, 1)[None, :, None]
        r0 = np.clip(np.floor(row).astype(int), 0, hs - 1); r1 = np.clip(r0 + 1, 0, hs - 1); fr = np.clip(row - r0, 0, 1)
        os.makedirs(os.path.join(out, str(z)), exist_ok=True)
        nx, ny = Wz // TS, int(math.ceil(Hz / TS))
        n = 0
        for ty in range(ny):
            ra, rb = ty * TS, min(Hz, (ty + 1) * TS)
            R0, R1, FR = r0[ra:rb], r1[ra:rb], fr[ra:rb][:, None, None]
            top = A[R0]; bot = A[R1]
            strip = top * (1 - FR) + bot * FR          # (h, ws, 3)
            for tx in range(nx):
                ca, cb = tx * TS, (tx + 1) * TS
                a = strip[:, c0[ca:cb]]; b = strip[:, c1[ca:cb]]
                t = a * (1 - fc[:, ca:cb]) + b * fc[:, ca:cb]
                if t.shape[0] < TS:  # dernière rangée : compléter
                    t = np.concatenate([t, np.repeat(t[-1:], TS - t.shape[0], axis=0)], axis=0)
                if t.reshape(-1, 3).std(axis=0).max() < 1.5:   # tuile uniforme (océan, glace) : inutile
                    continue
                Image.fromarray(np.clip(t, 0, 255).astype(np.uint8)).save(os.path.join(out, str(z), f"{tx}_{ty}.webp"), "WEBP", quality=Q, method=6)
                tiles.append(f"{z}/{tx}_{ty}"); n += 1
        print("niveau", z, ":", n, "tuiles", flush=True)
    with open(os.path.join(out, "index.json"), "w") as f:
        json.dump({"w0": W0, "ts": TS, "zmax": ZMAX, "x0": X0, "y0": Y0, "src": os.path.basename(src_path), "tiles": tiles}, f, separators=(",", ":"))
    print("total", len(tiles), "tuiles")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "map")
