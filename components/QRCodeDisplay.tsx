import { useEffect, useRef } from "react";

const QRCodeDisplay = ({ data }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (canvasRef.current && data) {
            // Simple QR code visualization (in production, use QRCode.js)
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            // Clear canvas
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, 200, 200);

            // Draw simple pattern (replace with actual QR code library)
            ctx.fillStyle = "black";
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    if (Math.random() > 0.5) {
                        ctx.fillRect(i * 20, j * 20, 18, 18);
                    }
                }
            }

            // Add center text
            ctx.fillStyle = "white";
            ctx.fillRect(60, 80, 80, 40);
            ctx.fillStyle = "black";
            ctx.font = "10px monospace";
            ctx.fillText("SCAN ME", 70, 105);
        }
    }, [data]);

    return (
        <div className="flex flex-col items-center gap-2">
            <canvas
                ref={canvasRef}
                width="200"
                height="200"
                className="border-2 border-gray-300 rounded"
            />
            <p className="text-xs text-gray-500 font-mono">{data}</p>
        </div>
    );
};

export default QRCodeDisplay;
