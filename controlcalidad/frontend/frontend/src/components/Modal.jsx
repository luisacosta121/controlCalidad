import React from "react";
import PrimaryButton from "./PrimaryButton";
import colores from "../styles/colores";
import { fontSizes } from "../styles/fontSizes";
import { buttonSizes } from "../styles/buttonSize";

const Modal = ({
    title,
    children,
    onConfirm,
    onCancel,
    showButtons = true,
    width,
}) => {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 999,
            }}
        >
            {/* CONTENEDOR DEL MODAL */}
            <div
                style={{
                    backgroundColor: colores.white,
                    borderRadius: "25px",
                    width: width,
                    padding: "20px",
                    boxShadow: "0px 4px 20px rgba(0,0,0,0.25)",
                }}
            >
                {/* TITULO DEL MODAL */}
                <h2
                    style={{
                        textAlign: "center",
                        fontSize: fontSizes.modalTitle,
                        fontWeight: "bold",
                        marginTop: "0px",
                        marginBottom: "5px",
                        color: colores.black,
                    }}
                >
                    {title}
                </h2>

                <hr />

                {/* CONTENIDO DEL MODAL */}
                <div style={{ 
                    marginTop: "15px", 
                    marginBottom: "25px",
                    maxHeight: "400px",
                    overflowY: "auto"
                }}>{children}</div>

                <hr />

                {/* BOTONES */}
                {showButtons && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "20px",
                            marginTop: "20px",
                        }}
                    >
                        <PrimaryButton
                            text="CANCELAR"
                            color={colores.primaryRed}
                            textColor="white"
                            fontWeight="bold"
                            width={buttonSizes.mediumButton}
                            height="55px"
                            onClick={onCancel}
                        />

                        <PrimaryButton
                            text="CONFIRMAR"
                            color={colores.primaryBlue}
                            textColor="white"
                            fontWeight="bold"
                            width={buttonSizes.mediumButton}
                            height="55px"
                            onClick={onConfirm}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
