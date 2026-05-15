"use client";

import { ColorPaletteItem } from "@/lib/types";

interface ColorPaletteProps {
  palette: ColorPaletteItem[];
}

export default function ColorPalette({ palette }: ColorPaletteProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">Color Palette</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {palette.map((color, index) => (
          <div key={index} className="flex items-start gap-3 p-2 rounded-lg bg-[var(--bg-secondary)]">
            <div
              className="w-12 h-12 rounded-lg shadow-inner flex-shrink-0"
              style={{ backgroundColor: color.hex }}
            />
            <div className="min-w-0">
              <p className="text-xs font-medium break-words">{color.name}</p>
              <p className="text-[10px] text-[var(--text-tertiary)] font-mono">{color.hex}</p>
              {color.how_to_use && (
                <p className="text-[10px] text-[var(--text-secondary)] mt-1 break-words">{color.how_to_use}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}