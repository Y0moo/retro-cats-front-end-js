import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall
} from 'react-moralis'
import { Box, Button, makeStyles } from '@material-ui/core'
import helperConfig from "../helper-config.json"
import React, { useState, useEffect } from "react"
import { CatList } from "./CatList"

const useStyles = makeStyles(theme => ({
  default: {
    padding: theme.spacing(1),
  },
}))

export const ShowCats = ({ networkId, retroCatsAddress }) => {
  const classes = useStyles()
  const networkName = networkId ? helperConfig[String(networkId)] : "dev"
  const Web3Api = useMoralisWeb3Api()
  const { web3, user } = useMoralis()
  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(Web3Api.account.getNFTsForContract,
    { chain: networkName, address: user.attributes.accounts, token_address: retroCatsAddress }
  )

  return (
    <Box textAlign='center'>
      <Button
        onClick={async () => await fetch()}
        color="primary"
        size="small">
        Refresh
      </Button>
      {error && <div>{error.message}</div>}
      {data ? <CatList catListData={data} /> : <div>No Cats..</div>}
    </Box>

  )
}
