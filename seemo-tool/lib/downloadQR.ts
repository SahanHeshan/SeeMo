import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function downloadQRCodesFromRefs(
  svgRefs: (SVGSVGElement | null)[]
) {
  const zip = new JSZip();

  svgRefs.forEach((svg, i) => {
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    zip.file(`qr_${i + 1}.svg`, blob);
  });

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, "qr_codes.zip");
}
