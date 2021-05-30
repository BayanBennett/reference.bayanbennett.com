import * as React from "react";
import { Box, Drawer, Fab } from "@material-ui/core";
import { FunctionComponent } from "react";
import { PathTree } from "../components/path-tree";

const Puller: FunctionComponent<{ onClick: () => void; open: boolean }> = ({
  onClick,
  open,
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: open ? -50 : -20,
      top: 0,
      bottom: 0,
      visibility: "visible",
      transition: (theme) => theme.transitions.create(["right"]),
    }}
  >
    <Fab onClick={onClick} size="small" sx={{ fontFamily: "monospace" }}>
      {open ? "❌" : "🌳"}
    </Fab>
  </Box>
);

type TreeDrawerProps = { children?: never };

export const TreeDrawer: FunctionComponent<TreeDrawerProps> = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen?: boolean) =>
    typeof newOpen === "undefined"
      ? () => setOpen((prevOpen) => !prevOpen)
      : () => setOpen(newOpen);

  return (
    <Drawer
      open={open}
      onClose={toggleDrawer(false)}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: { overflow: "visible" },
      }}
    >
      <Puller onClick={toggleDrawer()} open={open} />
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexFlow: "column nowrap",
          flex: 1,
          padding: 1,
          paddingRight: 2,
          overflowY: "auto",
        }}
      >
        <PathTree />
      </Box>
    </Drawer>
  );
};
