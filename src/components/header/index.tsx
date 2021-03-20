import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getUser } from '../../services/user'
import { logout } from '../../services/auth'
import { userProps } from '../../interfaces/user'
import logoImage from '../../images/logo-censf-white.png'

import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';

import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    menuIcon: {
      color: '#FFF'
    },
    menuItem: {
      width: 200
    },
    boxMenu: {
      display: 'flex'
    }
  })
)

interface TitleProps {
  title?: string
}

const Header = ({ title }: TitleProps) => {

  const classes = useStyles();

  let history = useHistory()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    history.push('/')
    setAnchorEl(null)
  }

  const [ user ] = useState<userProps>(getUser())
  
  return (
    <div className="header">
      <img src={logoImage} alt="CENSF" />
      <div className="info">
        {title && <h3>{title}</h3>}
        {user &&
          <div className={classes.boxMenu}>
            <p>{user.name}</p>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <MenuIcon className={classes.menuIcon} />
            </Button>
            <Popover
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={ () => history.push('/prematricula') } className={classes.menuItem}>Cadastro</MenuItem>
              <MenuItem onClick={ () => history.push('/lista') } className={classes.menuItem}>Matriculados</MenuItem>
              <MenuItem onClick={handleLogout} className={classes.menuItem}>Sair</MenuItem>
            </Popover>
          </div>
        }
      </div>
    </div>
  )
}

export default Header