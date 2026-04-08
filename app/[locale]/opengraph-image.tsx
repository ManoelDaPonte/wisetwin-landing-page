import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "WiseTwin - Formation industrielle immersive";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage({
	params,
}: {
	params: { locale: string };
}) {
	const isEn = params.locale === "en";

	return new ImageResponse(
		(
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					background: "linear-gradient(135deg, #0F0B66 0%, #1a1080 50%, #0F0B66 100%)",
					fontFamily: "sans-serif",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: "24px",
					}}
				>
					<div
						style={{
							fontSize: 72,
							fontWeight: 800,
							color: "#00C7FF",
							letterSpacing: "-2px",
						}}
					>
						WiseTwin
					</div>
					<div
						style={{
							fontSize: 32,
							fontWeight: 600,
							color: "#ffffff",
							textAlign: "center",
							maxWidth: "800px",
							lineHeight: 1.3,
						}}
					>
						{isEn
							? "Immersive digital twins for industrial training"
							: "Jumeaux numériques immersifs pour la formation industrielle"}
					</div>
					<div
						style={{
							display: "flex",
							gap: "16px",
							marginTop: "16px",
						}}
					>
						<div
							style={{
								padding: "8px 20px",
								borderRadius: "20px",
								background: "rgba(0, 199, 255, 0.15)",
								border: "1px solid rgba(0, 199, 255, 0.3)",
								color: "#00C7FF",
								fontSize: 18,
							}}
						>
							WiseTrainer
						</div>
						<div
							style={{
								padding: "8px 20px",
								borderRadius: "20px",
								background: "rgba(0, 199, 255, 0.15)",
								border: "1px solid rgba(0, 199, 255, 0.3)",
								color: "#00C7FF",
								fontSize: 18,
							}}
						>
							WiseAtlas
						</div>
					</div>
				</div>
				<div
					style={{
						position: "absolute",
						bottom: "32px",
						fontSize: 16,
						color: "rgba(255, 255, 255, 0.5)",
					}}
				>
					wisetwin.eu
				</div>
			</div>
		),
		{ ...size }
	);
}
