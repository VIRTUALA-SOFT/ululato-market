#!/usr/bin/env python3
"""
Script para generar favicon y apple-touch-icon desde el logo de ULULATO
"""

from PIL import Image
import os

# Rutas
logo_path = "/home/ubuntu/ululato/client/public/images/logo-ululato.png"
output_dir = "/home/ubuntu/ululato/client/public"

# Cargar imagen original
img = Image.open(logo_path)

# Convertir a RGBA si no lo es
if img.mode != 'RGBA':
    img = img.convert('RGBA')

# Generar favicon.ico (múltiples tamaños)
favicon_sizes = [(16, 16), (32, 32), (48, 48)]
favicon_images = []
for size in favicon_sizes:
    resized = img.copy()
    resized.thumbnail(size, Image.Resampling.LANCZOS)
    # Crear imagen cuadrada con fondo transparente
    square = Image.new('RGBA', size, (0, 0, 0, 0))
    # Centrar la imagen
    offset = ((size[0] - resized.width) // 2, (size[1] - resized.height) // 2)
    square.paste(resized, offset, resized)
    favicon_images.append(square)

# Guardar favicon.ico
favicon_images[0].save(
    os.path.join(output_dir, "favicon.ico"),
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=favicon_images[1:]
)

# Generar apple-touch-icon (180x180)
apple_size = (180, 180)
apple_img = img.copy()
apple_img.thumbnail((160, 160), Image.Resampling.LANCZOS)
# Crear imagen cuadrada con fondo oscuro (#050505)
apple_square = Image.new('RGBA', apple_size, (5, 5, 5, 255))
offset = ((apple_size[0] - apple_img.width) // 2, (apple_size[1] - apple_img.height) // 2)
apple_square.paste(apple_img, offset, apple_img)
apple_square.save(os.path.join(output_dir, "apple-touch-icon.png"), format='PNG')

# Generar favicon-32x32.png
favicon_32 = img.copy()
favicon_32.thumbnail((32, 32), Image.Resampling.LANCZOS)
square_32 = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
offset_32 = ((32 - favicon_32.width) // 2, (32 - favicon_32.height) // 2)
square_32.paste(favicon_32, offset_32, favicon_32)
square_32.save(os.path.join(output_dir, "favicon-32x32.png"), format='PNG')

# Generar favicon-16x16.png
favicon_16 = img.copy()
favicon_16.thumbnail((16, 16), Image.Resampling.LANCZOS)
square_16 = Image.new('RGBA', (16, 16), (0, 0, 0, 0))
offset_16 = ((16 - favicon_16.width) // 2, (16 - favicon_16.height) // 2)
square_16.paste(favicon_16, offset_16, favicon_16)
square_16.save(os.path.join(output_dir, "favicon-16x16.png"), format='PNG')

print("Favicon generados exitosamente:")
print(f"  - {output_dir}/favicon.ico")
print(f"  - {output_dir}/apple-touch-icon.png")
print(f"  - {output_dir}/favicon-32x32.png")
print(f"  - {output_dir}/favicon-16x16.png")
