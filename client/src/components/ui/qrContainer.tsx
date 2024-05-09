import { useQRCode } from "next-qrcode";

export default function QrContainer({
  session,
}: {
  session: {
    email: string;
    name: string;
    image: string;
  };
}) {
  const { Canvas } = useQRCode();

  return (
    <>
      <Canvas
        text={"http://localhost:3000?email=" + session.email}
        options={{
          errorCorrectionLevel: "M",
          margin: 2,
          scale: 4,
          width: 200,
          quality: 100,
          color: {
            dark: "#000",
            light: "#fff",
          },
        }}
      />
    </>
  );
}
