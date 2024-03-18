import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box, Button, CircularProgress, LinearProgress, Typography } from "@mui/material";
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { TextField } from "formik-mui";
import ChangeChain from "./ChangeChain";
import { parseEther } from "@/utils/parse";
import { LoadingButton } from "@mui/lab";

interface FormValues {
  address: number | string;
  value: number | string;
}

const SendForm = () => {
  const { data: hash, error, isPending, sendTransaction } = useSendTransaction();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  const { chain } = useAccount();
  const initialValues: FormValues = { address: "", value: "" };

  const onSubmit = ({ address, value }: FormValues) => {
    if (address && value) {
      const to = address as `0x${string}`;
      sendTransaction({ to, value: parseEther(value.toString()) });
    }
  };

  const SignupSchema = Yup.object().shape({
    address: Yup.string().required("Enter address"),
    value: Yup.number().min(0, "Min 0").required("Enter value"),
  });

  return (
    <>
      <Box
        width="100%"
        height="40px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        {(error || hash) && (
          <Typography
            fontSize="9px"
            lineHeight="1"
            component="div"
            color={error ? "error" : "primary"}
          >
            {error ? "Error send" : hash ?? hash}
          </Typography>
        )}
        {isLoading ? (
          <CircularProgress color="primary" size={30} />
        ) : (
          isSuccess && (
            <Typography fontSize="20px" lineHeight="1" component="div" color="primary">
              Transaction success
            </Typography>
          )
        )}
      </Box>
      <Box width="100%" display="flex" justifyContent="space-between" gap={0.5}>
        <ChangeChain />
        <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={onSubmit}>
          {() => (
            <Form
              style={{
                width: "100%",
                flexDirection: "column",
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <Field
                disabled={isPending || !chain}
                component={TextField}
                name="address"
                label="address"
                style={{ width: "100%" }}
              />
              <Box width="100%" display="flex" justifyContent="space-between" gap={1}>
                <Field
                  disabled={isPending || !chain}
                  component={TextField}
                  name="value"
                  type="number"
                  label="value"
                  style={{ width: "100%" }}
                />
                <LoadingButton
                  disabled={isPending || !chain}
                  loading={isPending}
                  color="primary"
                  style={{ height: "56px", width: "120px", fontSize: "20px" }}
                  variant="contained"
                  size="medium"
                  type="submit"
                  loadingIndicator={<CircularProgress color="primary" size={40} />}
                >
                  <span>Send</span>
                </LoadingButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};
export default SendForm;
