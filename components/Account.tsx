import { useAccount, useBalance } from "wagmi";
import { mainnet, bsc, auroraTestnet } from "wagmi/chains";
import { Box, CircularProgress, List, ListItem, SvgIcon, Typography } from "@mui/material";
import { formatUnits } from "@/utils/parse";

const Account = () => {
  const { address } = useAccount();
  const { data: balanceBnb } = useBalance({
    address,
    chainId: bsc.id,
  });
  const { data: balanceEth } = useBalance({
    address,
    chainId: mainnet.id,
  });
  const { data: balanceAurora } = useBalance({
    address,
    chainId: auroraTestnet.id,
  });

  return (
    <>
      {address && (
        <Box width="100%" flexWrap="wrap" display="flex" justifyContent="center" gap={1}>
          {address && (
            <Typography gutterBottom fontSize={{ sm: 20, xs: 13 }} component="div">
              {address}
            </Typography>
          )}

          <List
            style={{
              width: "100%",
              height: "70px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <>
              <ListItem style={{ gap: "5px", padding: 0 }}>
                {balanceBnb ? (
                  <>
                    <SvgIcon style={{ width: "30px", height: "40px" }}>
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
                    <Typography fontSize="20px" component="div">
                      {formatUnits(balanceBnb?.value, balanceBnb?.decimals)}
                    </Typography>
                  </>
                ) : (
                  <CircularProgress color="primary" size={30} />
                )}
              </ListItem>
              <ListItem style={{ gap: "5px", padding: 0 }}>
                {balanceEth ? (
                  <>
                    <SvgIcon style={{ width: "30px", height: "40px" }}>
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
                    <Typography fontSize="20px" component="div">
                      {formatUnits(balanceEth?.value, balanceEth?.decimals)}
                    </Typography>
                  </>
                ) : (
                  <CircularProgress color="primary" size={30} />
                )}
              </ListItem>
              <ListItem style={{ gap: "5px", padding: 0 }}>
                {balanceAurora ? (
                  <>
                    <Typography fontSize="30px" lineHeight="1" component="div">
                      A
                    </Typography>
                    <Typography fontSize="20px" component="div">
                      {formatUnits(balanceAurora?.value, balanceAurora?.decimals)}
                    </Typography>
                  </>
                ) : (
                  <CircularProgress color="primary" size={30} />
                )}
              </ListItem>
            </>
          </List>
        </Box>
      )}
    </>
  );
};
export default Account;
