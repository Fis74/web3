"use client";
import Account from "@/components/Account";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "@/components/Navbar";
import SendForm from "@/components/SendForm";
import { Box, CircularProgress, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useAccount, useConnect } from "wagmi";
import { useEffect, useState } from "react";

const Home = () => {
  const { connectors } = useConnect();
  const [connector] = connectors;
  const [ready, setReady] = useState(false);
  const { isConnected } = useAccount();

  useEffect(() => {
    if (connector) {
      (async () => {
        try {
          const provider = await connector.getProvider();
          setReady(!!provider);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [connector, setReady]);

  return (
    <>
      <CssBaseline />
      <Navbar ready={ready} />
      <Container
        component="main"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isConnected ? (
          <Box
            width={700}
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="space-between"
            gap={2}
            p={{ sm: 2, xs: 0.5 }}
            border={"1px solid grey"}
            borderRadius="10px"
          >
            <Account />
            <SendForm />
          </Box>
        ) : !ready ? (
          <CircularProgress color="primary" size={40} />
        ) : (
          <Typography style={{ fontSize: "30px" }} component="div">
            Enter Wallet
          </Typography>
        )}
      </Container>
    </>
  );
};
export default Home;
