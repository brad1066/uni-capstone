import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface PasswordResetEmailProps {
  username: string
  authKey: string
  authVal: string
}

const baseUrl = process.env.HOST_URL
  ? `https://${process.env.HOST_URL}`
  : '';

export const PasswordResetEmail = ({
  authKey, authVal
}: PasswordResetEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to GoLearn</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>You've requested a password change. If this was not you, please ignore or speak to an administrator</Heading>
        <Text style={{ ...text, marginBottom: '14px' }}>
          Please use the verification below to reset your password.
        </Text>
        <code style={code}>{authVal}</code>
        <Button
          href={`${baseUrl}/validate/${authKey}`}
          target='_blank'
          style={{
            ...button,
            display: 'block',
            marginBottom: '16px',
          }}
          pX={24}
          pY={16}
        >
          Click here to reset your password
        </Button>
      </Container>
    </Body>
  </Html>
);

export default PasswordResetEmail;

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
};

const h1 = {
  color: '#333',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const link = {
  color: '#2754C5',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  fontSize: '14px',
  textDecoration: 'underline',
};

const button = {
  color: '#fff',
  textDecoration: 'none',
  backgroundColor: 'hsl(0 72.2% 50.6%)',
  borderRadius: '5px',
  margin: '0 auto',
}

const text = {
  color: '#333',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  fontSize: '14px',
  margin: '24px 0',
};

const footer = {
  color: '#898989',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
};

const code = {
  display: 'block',
  padding: '16px 4.5%',
  width: 'fit-content',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
};
