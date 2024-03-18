import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useSwitchChain } from "wagmi";
import { Chain } from "wagmi/chains";
import * as React from "react";
import { Dialog, DialogTitle, ListItem, ListItemIcon, SvgIcon, Typography } from "@mui/material";

interface ModalProps {
  id: string;
  keepMounted: boolean;
  value: Chain;
  open: boolean;
  onClose: () => void;
}

const Modal = ({ onClose, value, open }: ModalProps) => {
  const { chains, switchChain, isSuccess } = useSwitchChain();
  const handleClose = () => {
    onClose();
  };
  React.useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  const handleListItemClick = (chain: Chain) => {
    switchChain({ chainId: chain.id });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Switch Networks</DialogTitle>
      <List>
        {chains.map((chain) => (
          <ListItem disableGutters key={chain.id}>
            <ListItemButton
              disabled={value ? chain.id === value.id : false}
              onClick={() => handleListItemClick(chain)}
            >
              <ListItemIcon>
                {chain.name === "Ethereum" ? (
                  <SvgIcon style={{ width: "50px", height: "50px" }}>
                    <svg viewBox="-80.5 0 417 417" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <polygon
                          fill="#343434"
                          points="127.9611 0 125.1661 9.5 125.1661 285.168 127.9611 287.958 255.9231 212.32"
                        ></polygon>
                        <polygon
                          fill="#8C8C8C"
                          points="127.962 0 0 212.32 127.962 287.959 127.962 154.158"
                        ></polygon>
                        <polygon
                          fill="#3C3C3B"
                          points="127.9611 312.1866 126.3861 314.1066 126.3861 412.3056 127.9611 416.9066 255.9991 236.5866"
                        ></polygon>
                        <polygon
                          fill="#8C8C8C"
                          points="127.962 416.9052 127.962 312.1852 0 236.5852"
                        ></polygon>
                        <polygon
                          fill="#141414"
                          points="127.9611 287.9577 255.9211 212.3207 127.9611 154.1587"
                        ></polygon>
                        <polygon
                          fill="#393939"
                          points="0.0009 212.3208 127.9609 287.9578 127.9609 154.1588"
                        ></polygon>
                      </g>
                    </svg>
                  </SvgIcon>
                ) : chain.name === "BNB Smart Chain" ? (
                  <SvgIcon style={{ width: "50px", height: "50px" }}>
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <g fill="none">
                        <circle cx="16" cy="16" r="16" fill="#F3BA2F" />
                        <path
                          fill="#FFF"
                          d="M12.116 14.404L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.259L16 26l-6.144-6.144-.003-.003 2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29-.004-.004.004-.003.401-.402.195-.195L16 13.706l2.293 2.293z"
                        />
                      </g>
                    </svg>
                  </SvgIcon>
                ) : (
                  <Typography fontSize="50px" lineHeight="1" component="div">
                    A
                  </Typography>
                )}
              </ListItemIcon>
              <ListItemText primary={chain.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
export default Modal;
