import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { SxProps } from "@mui/material";
import { EnvModes } from "./App.types";

export const secretKeyBoxSx: SxProps = {
  padding: "2rem",
  color: "white", // White text color
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  alignItems: "center",
  textAlign: "center",
  justifyContent: "center",
  backgroundColor: "#111",
};

export const boxSx: SxProps = {
  p: 5,
  pt: 10,
  color: "white", // White text color
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  justifyContent: "center",
  backgroundColor: "#111",
};

export const textFieldSx: SxProps = {
  width: "100%",
  maxWidth: "500px",
  color: "white",
};

export const linearProgressSx: SxProps = {
  margin: "2rem 0",
};

export const innerBoxSx: SxProps = {
  width: "100%",
  mt: 5,
  textAlign: "center", // Center-align text
};

export const circularProgressSx: SxProps = { margin: 2, color: "white" };

export const EnvironmentFlag = styled.span<{
  env: EnvModes;
}>`
  width: auto;
  ${({ env }) =>
    env === "production" &&
    css`
      display: none;
    `}
  position: fixed;
  top: 10px;
  left: 10px;
  background-color: blue;
`;
