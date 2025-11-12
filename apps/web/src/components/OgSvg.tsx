import Signature from "@/assets/signature.svg?react";

const OgSvg = ({ title }: { title: string }) => {
  return (
    <div
      style={{
        background: "rgb(23, 23, 23)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgb(255, 255, 255)",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "80%",
          gap: "3rem",
        }}
      >
        <Signature
          style={{
            width: "6rem",
            height: "6rem",
            flexShrink: 0,
            position: "relative",
            top: "1rem",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: "column",
            width: "80%",
            gap: "0.1rem",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              opacity: 0.5,
              margin: 0,
            }}
          >
            Friedrich WT
          </h2>
          <h1 style={{ fontSize: "3rem", margin: 0 }}>{title}</h1>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          width: "20rem",
          height: "20rem",
          right: "-10rem",
          bottom: "-10rem",
          borderRadius: "50%",
          border: "0.5rem solid rgb(5, 223, 114)",
          opacity: 0.8,
        }}
      />
    </div>
  );
};

export default OgSvg;
