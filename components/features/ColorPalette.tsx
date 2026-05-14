"use client";

import { ColorPaletteItem } from "@/lib/types";

interface ColorPaletteProps {
  palette: ColorPaletteItem[];
}

export default function ColorPalette({ palette }: ColorPaletteProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">Color Palette</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
        {palette.map((color, index) => (
          <div key={index} className="flex-shrink-0 w-24 text-center">
            <div
              className="w-full h-16 rounded-lg shadow-inner mb-2"
              style={{ backgroundColor: color.hex }}
            />
            <p className="text-xs font-medium truncate">{color.name}</p>
            <p className="text-[10px] text-[var(--text-tertiary)] font-mono">{color.hex}</p>
          </div>
        ))}
      </div>
    </div>
  );
}