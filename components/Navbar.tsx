import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAccount, useChainId, useConnect, useDisconnect } from "wagmi";
import Link from "next/link";
import { CircularProgress, Container } from "@mui/material";

interface NavbarProps {
  ready: boolean;
}

const Navbar = ({ ready }: NavbarProps) => {
  const chainId = useChainId();
  const { connectors, connect } = useConnect();
  const [connector] = connectors;
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const logout = () => disconnect();
  const login = () => connect({ connector, chainId });

  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar>
          <Typography style={{ fontSize: "30px" }} component="div" flexGrow="1">
            <Link style={{ color: "inherit", textDecoration: "none" }} href="/">
              Stakewolle
            </Link>
          </Typography>

          {!isConnected ? (
            <LoadingButton
              loading={!ready}
              onClick={login}
              color="inherit"
              variant="outlined"
              size="medium"
              loadingIndicator={<CircularProgress color="secondary" size={22} />}
            >
              <span>Wallet</span>
            </LoadingButton>
          ) : (
            <LoadingButton
              loading={!ready}
              onClick={logout}
              color="inherit"
              variant="outlined"
              size="medium"
              loadingIndicator={<CircularProgress color="secondary" size={22} />}
            >
              <span>Logout</span>
            </LoadingButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
