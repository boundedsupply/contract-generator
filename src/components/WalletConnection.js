import React from 'react'
import {useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import styled from 'styled-components';

const WalletConnection = () => {
    const { activateBrowserWallet, account } = useEthers();
    const etherBalance = useEtherBalance(account);
    return (
        <WalletStyle>
            <button onClick={() => activateBrowserWallet()}>Connect</button>
            {account && <p>Account: {account}</p>}
            {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
        </WalletStyle>
    )
}

const WalletStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
        width: 75%;
        height: 40px;
        border: none;
        margin: 1rem 0;
        border-radius: 8px;
        background-color: #70EDB9;
        color: #ffffff;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease-in;
        &:hover{
            transform: translateY(-3px);
        }
    }
`;

export default WalletConnection;
