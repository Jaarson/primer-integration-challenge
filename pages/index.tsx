import React, { useEffect, useContext } from 'react';
import { Primer } from '@primer-io/checkout-web';
import Head from 'next/head';
import { Container, Main, Title } from '../components/sharedstyles';
import styled, { ThemeContext } from 'styled-components';

const Checkout = styled.div`
  display: flex;
  max-width: 500px;
  flex-direction: column;
  padding: 32px;
  margin: 40px 16px;
  background-color: ${({ theme }) => theme.colors.popper};
  border-radius: 24px;
`;

export default function Home() {
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    async function onLoaded() {
      const clientSession = await fetch('/api/client-session', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
      }).then((data) => data.json());

      const { clientToken } = clientSession;

      try {
        const universalCheckout = await Primer.showUniversalCheckout(clientToken, {
          // Specify the selector of the container element
          container: '#checkout-container',

          vault: {
            visible: true,
          },

          locale: 'pl-PL',

          submitButton: {
            amountVisible: true,
          },

          onCheckoutComplete({ payment }) {
            console.log('Checkout Complete!', payment);
          },

          style: {
            inputLabel: {
              fontFamily: 'Inter',
              color: themeContext.colors.primary,
            },
            input: {
              base: {
                boxShadow: '0px',
                background: themeContext.colors.inputs,
                fontFamily: 'Inter',
                borderRadius: '8px',
                paddingHorizontal: 8,
                lineHeight: '56px',
                color: themeContext.colors.primary,
                placeholder: {
                  color: themeContext.colors.placeholders,
                },
                focus: {
                  background: themeContext.colors.inputsActive,
                  borderStyle: 'none',
                  boxShadow: '0px 0px 0px 3px #419d5e;',
                },
              },
            },
            submitButton: {
              base: {
                color: themeContext.colors.surface,
                background: themeContext.colors.primary,
                borderRadius: '8px',
                fontFamily: 'Inter',
                fontWeight: 'bold',
                hover: {
                  background: themeContext.colors.pure,
                },
              },
              disabled: {
                background: themeContext.colors.placeholders,
                color: themeContext.colors.popper,
              },
            },
          },
        });
        console.log('Universal Checkout is ready!');
      } catch (e) {
        console.log('Failed to show Universal Checkout', e);
      }
    }
    onLoaded();
  }, []);

  return (
    <Container>
      <Head>
        <title>Cześć 👋</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Main>
        <Title>Cześć 👋</Title>
        <Checkout id='checkout-container'></Checkout>
      </Main>
    </Container>
  );
}
