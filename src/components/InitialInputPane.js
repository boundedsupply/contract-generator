import React from 'react';
import styled from 'styled-components';
import logo from '../assets/color_logo.png'
import Input from "./Input";
import WalletConnection from "./WalletConnection";

import { ChainId, DAppProvider } from '@usedapp/core'

const config: Config = {
    readOnlyChainId: ChainId.Ropsten,
    readOnlyUrls: {
      [ChainId.Ropsten]: 'https://ropsten.infura.io/v3/887ee498e11f40d1b0fbe3a66f9f4c4f',
    },
  }

function downloadContractFile() {
    const element = document.createElement("a");
    const itemName  = document.getElementById('name').value;
    const itemSymbol  = document.getElementById('symbol').value;
    const itemSupply  = document.getElementById('supply').value;
    var full_file = "";
    full_file += "# ERC20 implementation adapted from https://github.com/ethereum/vyper/blob/master/examples/tokens/ERC20.vy\n";
    full_file += "\n";
    full_file += "Transfer: event({_from: indexed(address), _to: indexed(address), _value: uint256})\n";
    full_file += "Approval: event({_owner: indexed(address), _spender: indexed(address), _value: uint256})\n";
    full_file += "\n";
    full_file += "name: public(string[32])\n";
    full_file += "symbol: public(string[32])\n";
    full_file += "decimals: public(uint256)\n";
    full_file += "totalSupply: public(uint256)\n";
    full_file += "balanceOf: public(map(address, uint256))\n";
    full_file += "allowances: map(address, map(address, uint256))\n";
    full_file += "\n"
    full_file += "\n"
    full_file += "@public\n"
    full_file += "def __init__():\n"
    full_file += "\t_supply: uint256 = " + itemSupply +"*10**18\n"
    full_file += "\tself.name = '"+ itemName +"'\n"
    full_file += "\tself.symbol = '"+ itemSymbol +"'\n"
    full_file += "\tself.balanceOf[msg.sender] = _supply\n"
    full_file += "\tself.totalSupply = _supply\n"
    full_file += "\tlog.Transfer(ZERO_ADDRESS, msg.sender, _supply)\n"
    full_file += "\n"
    full_file += "\n"
    full_file += "@public\n"
    full_file += "@constant\n"
    full_file += "def allowance(_owner : address, _spender : address) -> uint256:\n"
    full_file += "\treturn self.allowances[_owner][_spender]\n"
    full_file += "\n"
    full_file += "@public\n"
    full_file += "def transfer(_to : address, _value : uint256) -> bool:\n"
    full_file += "\tself.balanceOf[msg.sender] -= _value\n"
    full_file += "\tself.balanceOf[_to] += _value\n"
    full_file += "\tlog.Transfer(msg.sender, _to, _value)\n"
    full_file += "\treturn True\n"
    full_file += "\n"
    full_file += "@public\n"
    full_file += "def transferFrom(_from : address, _to : address, _value : uint256) -> bool:\n"
    full_file += "\tself.balanceOf[_from] -= _value\n"
    full_file += "\tself.balanceOf[_to] += _value\n"
    full_file += "\tif self.allowances[_from][msg.sender] < MAX_UINT256:\n"
    full_file += "\t\tself.allowances[_from][msg.sender] -= _value\n"
    full_file += "\tlog.Transfer(_from, _to, _value)\n"
    full_file += "\treturn True\n"
    full_file += "\n"
    full_file += "\n"
    full_file += "@public\n"
    full_file += "def approve(_spender : address, _value : uint256) -> bool:\n"
    full_file += "\tself.allowances[msg.sender][_spender] = _value\n"
    full_file += "\tlog.Approval(msg.sender, _spender, _value)\n"
    full_file += "\treturn True\n"
    full_file += "\n"
    full_file += "\n"
    full_file += "@public\n"
    full_file += "def burn(_value: uint256) -> bool:\n"
    full_file += "\tself.totalSupply -= _value\n"
    full_file += "\tself.balanceOf[msg.sender] -= _value\n"
    full_file += "\tlog.Transfer(msg.sender, ZERO_ADDRESS, _value)\n"
    full_file += "\treturn True\n"
    full_file += "\n"
    full_file += "\n"
    full_file += "@public\n"
    full_file += "def burnFrom(_from: address, _value: uint256) -> bool:\n"
    full_file += "\tif self.allowances[_from][msg.sender] < MAX_UINT256:\n"
    full_file += "\t\tself.allowances[_from][msg.sender] -= _value\n"
    full_file += "\tself.totalSupply -= _value\n"
    full_file += "\tself.balanceOf[_from] -= _value\n"
    full_file += "\tlog.Transfer(_from, ZERO_ADDRESS, _value)\n"
    full_file += "\treturn True\n"

    const file = new Blob([full_file], {type: 'text/plain; charset = utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = itemSymbol +".vy";
    document.body.appendChild(element);
    element.click();
}

const InitialInputPane = () => {

    return (
        <Container>
            <LogoWrapper>
                <img src={logo} alt=""/>
            </LogoWrapper>

            <DAppProvider config={config}>
                <WalletConnection />
            </DAppProvider>

            <Form>

                <h3>Seller Portal</h3>
                <h2></h2>
                <h2>List Collectible</h2>
                <h2></h2>
                
                <Input id="name" placeholder="Item Name"/>
                <Input id="symbol" placeholder="Token Symbol"/>
                <Input id="supply" placeholder="Units Available" type="number"/>

                <select name="Deployment Network" id="networks">
                    <option value="mainnet">Ethereum Main Network</option>
                    <option value="ropsten">Ropsten Test Network</option>
                    <option value="rinkeby">Rinkeby Test Network</option>
                    <option value="kovan">Kovan Test Network</option>
                    <option value="goerli">Goerli Test Network</option>
                </select>

                <h1>
                    Deployment Fee:
                    <span>
                    &nbsp;somevalue
                    </span>
                </h1>
                <button onClick={downloadContractFile}> Generate Burnable Token Contract </button>
            </Form>
        </Container>
    )
}

const Form = styled.form`
    width : 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    h3 {
        font-weight: 700;
        margin-top: 2rem;
        margin-bottom: 2rem;
        text-align: center;
        font-size: 30px;
    }
    h2 {
        font-weight: 600;
        margin-bottom: 1rem;
        text-align: center;
        font-size: 20px;
    }
    h1 {
        font-weight: 300;
        margin-bottom: 1rem;
        text-align: center;
        font-size: 16px;
    }
    select {
        width : 90%;
        max-width: 376px;
        height: 40px;
        border: none;
        margin: 0.5rem 0;
        background-color: #f5f5f5;
        border-radius: 8px;
        padding: 0 1rem;
        
        
        margin-bottom: 1rem;

        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    span {
        color: #5dc399;
    }
    button {
        width: 75%;
        max-width: 350px;
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

const LogoWrapper = styled.div`
img {
    height: 3rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

h3 {
    text-align: center;
    font-weight: 300;
    font-size: 18px
}
margin-top: 1rem;
margin-bottom: 1rem;

`;

const Container = styled.div`
    width : 60%;
    margin: 0 auto;
    backdrop-filter : blur(135px);
    background-color : rgba(255, 255, 255, 0.1);
    height: 100%; 
    display: flex;
    flex-direction: column;
    justify-content: normal;
    align-items: center;
    padding: 0 2rem;

    @media (max-width : 900px) {
        width: 100vw;
        position: absolute;
        padding: 0;
    }
`;

export default InitialInputPane;
