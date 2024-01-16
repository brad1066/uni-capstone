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

interface NewUserWelcomeEmailProps {
  username: string
  authKey: string
  authVal: string
}

const baseUrl = process.env.HOST_URL
  ? `https://${process.env.HOST_URL}`
  : '';

export const NewUserWelcomeEmail = ({
  username, authKey, authVal
}: NewUserWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to GoLearn</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>You"ve been added to GoLearn</Heading>
        <Text style={{ ...text, marginBottom: '14px' }}>
          Your account has been created and you can now log in to GoLearn.
        </Text>
        <Text style={{ ...text, marginBottom: '14px' }}>
          Your username is <code>{username}</code>
        </Text>
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
          You will need to click here to set your password:
        </Button>

        <Text
          style={{
            ...text,
            color: '#ababab',
            marginTop: '14px',
            marginBottom: '16px',
          }}>You are going to need the following code to log in: <code style={code}>{authVal}</code></Text>
      </Container>
    </Body>
  </Html>
);

export default NewUserWelcomeEmail;

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
