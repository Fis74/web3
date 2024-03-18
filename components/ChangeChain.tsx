import * as React from "react";
import Box from "@mui/material/Box";
import { Button, SvgIcon, Typography } from "@mui/material";
import { useAccount } from "wagmi";
import Modal from "./Modal";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ChangeChain = () => {
  const { chain, isConnected } = useAccount();
  const [open, setOpen] = React.useState(false);
  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {isConnected && (
        <Box display="flex" width={{ sm: "150px", xs: "60px" }} alignItems="center">
          {chain && chain?.name === "Ethereum" ? (
            <SvgIcon style={{ width: "35px", height: "35px" }}>
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
          ) : chain?.name === "BNB Smart Chain" ? (
            <SvgIcon style={{ width: "35px", height: "35px" }}>
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
          ) : chain?.name === "Aurora Testnet" ? (
            <Typography fontSize="35px" lineHeight="1" component="div">
              A
            </Typography>
          ) : (
            <Typography fontSize="35px" lineHeight="1" component="div">
              O
            </Typography>
          )}
          <Button
            sx={{
              margin: 0,
              minWidth: { xs: "0px" },
              padding: { xs: "0px" },
              fontSize: { xs: "0px", sm: "14px" },
              color: "black",
            }}
            aria-controls="chain-list"
            onClick={handleClickListItem}
            endIcon={<ArrowDropDownIcon />}
          >
            {chain?.name ?? "Other"}
          </Button>
          <Modal id="chain-list" keepMounted open={open} onClose={handleClose} value={chain!} />
        </Box>
      )}
    </>
  );
};
export default ChangeChain;
