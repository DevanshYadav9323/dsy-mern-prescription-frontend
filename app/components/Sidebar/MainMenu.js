import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import useStyles from './sidebar-jss';
import { toast } from 'react-toastify';
import axios from 'axios';
import AppConfig from '../../containers/App/constants/config';
import { Badge } from '@mui/material';
import { Button, Divider, Grid, IconButton, Input, MenuItem } from "@mui/material";
// import textLogo from '../../../public/images/logo/logoText.png'
import textLogo from '../../../public/images/logo/logoText.png'



const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

// eslint-disable-next-line
function MainMenu(props) {
  const { classes, cx } = useStyles();
  const handleClick = () => {
    const { toggleDrawerOpen, loadTransition } = props;
    toggleDrawerOpen();
    loadTransition(false);
  };

  const baseUrl = AppConfig.baseUrl
  const role =
  localStorage.getItem("role");

const token =
  role === "doctor"
    ? localStorage.getItem("doctorToken")
    : localStorage.getItem("patientToken");
  const {
    openSubMenu,
    open,
    dataMenu,
  } = props;
  // const [qrUrl, setQrUrl] = useState(null);
  const hasFetched = useRef(false);
  const qrUrl = localStorage.getItem("qr")
  const shop_name = localStorage.getItem("shop_name")
  // useEffect(() => {
  //   if (hasFetched.current) return;

  // const fetchQr = async () => {
  //   try {
  //     const {data} = await axios.get(`${baseUrl}/shop/shop_details`, {
  //     headers: { authorization: token },
  //   });
  //     setQrUrl(data.shop.qrUrl);
  //     hasFetched.current = true;
  //   } catch (err) {
  //     console.error("QR code fetch failed:", err);
  //     toast.error("Failed to load QR code.");
  //   }
  // };

  // fetchQr();
  // }, []);

  const getMenus = menuArray => menuArray.map((item, index) => {
    if (item.child || item.linkParent) {
      let result = item.linkParent.split('?')[0];

      return (
        <div key={index.toString()}>
          <ListItem
            button
            component={LinkBtn}
            to={item.linkParent ? item.linkParent : '#'}
            className={
              cx(
                classes.head,
                item.icon ? classes.iconed : '',
                (window.location.pathname).includes(result) ? classes.opened : '',
              )
            }
            onClick={() => { item.key == "query" ? handleSeen(item.key) : openSubMenu(item.key, item.keyParent) }}
          >
            {item.icon && (
              <ListItemIcon className={classes.icon} style={{ fontSize: "16px" }}>
                <i className={item.icon} />
              </ListItemIcon>
            )}
            <ListItemText classes={{ primary: classes.primary }} variant="inset" primary={item.name} />
            {/* {!item.linkParent && (
              <span>
                {open.indexOf(item.key) > -1 ? <ExpandLess /> : <ExpandMore />}
              </span>
            )} */}
          </ListItem>
          {!item.linkParent && (
            <Collapse
              component="div"
              className={cx(
                classes.nolist,
                (item.keyParent ? classes.child : ''),
              )}
              in={open.indexOf(item.key) > -1}
              timeout="auto"
              unmountOnExit
            >
              <List className={classes.dense} component="nav" dense>
                {getMenus(item.child, 'key')}
              </List>
            </Collapse>
          )}
        </div>
      );
    }
    // if (item.title) {
    //   return (
    //     <ListSubheader
    //       disableSticky
    //       key={index.toString()}
    //       component="div"
    //       className={classes.title}
    //     >
    //       {item.name}
    //     </ListSubheader>
    //   );
    // }
    return (
      <ListItem
        key={index.toString()}
        button
        className={classes.nested}
        activeClassName={classes.active}
        component={LinkBtn}
        to={item.link}
        onClick={() => handleClick()}
      >
        <ListItemText classes={{ primary: classes.primary }} inset primary={item.name} />
        {item.badge && (
          <Chip color="primary" label={item.badge} className={classes.badge} />
        )}
      </ListItem>
    );
  });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Menu items section */}
      <div style={{ flexGrow: 1, overflowY: 'auto' }}>
        {getMenus(dataMenu)}
      </div>

      {/* QR code and Print button section */}
      {qrUrl && (
  <div style={{ textAlign: 'center', padding: '16px' }}>
    <div id="qr-print-area">
      <img
        src={qrUrl}
        alt="QR Code"
        style={{
          width: '150px',
          height: '150px',
          objectFit: 'contain',
          display: 'block',
          margin: '0 auto',
        }}
        onClick={() => {
          const printContent = document.getElementById('qr-print-area');
          if (!printContent) return;

          const printWindow = window.open('', '', 'width=800,height=1000');
          printWindow.document.write(`
<html>
  <head>
    <title>${shop_name} QR</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <style>
      @page {
    margin: 0;
  }
      body {
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 32px;
        box-sizing: border-box;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        position: relative;
      }

      .collab-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 50px 0 0 0;
      }

      #print-logo {
        width: 240px;
        height: auto;
        margin-bottom: 12px;
      }

      .x-symbol {
        font-size: 36px;
        font-weight: bold;
        margin: 0;
      }

      #title-heading {
        font-size: 45px;
        font-weight: 600;
        margin: 0;
        // text-transform: capitalize;
      }

      #qr-image {
        width: 400px !important;
        height: 400px !important;
        margin: 24px 0;
      }

      .instructions {
  position: absolute;
  bottom: 150px;
  left: 180px;
  font-size: 18px;
  max-width: 60vw;
  line-height: 1.8;
  text-align: left; /* keep heading aligned left */
}
// .instructions-content {
//   margin: 10px 0 0 30px;
//   text-align: left;
// }

    </style>
  </head>
  <body>
    <div class="collab-section">
      <img id="print-logo" src="${textLogo}" alt="Logo" />
      <p class="x-symbol">X</p>
      <p id="title-heading">${shop_name}</p>
    </div>

    <img id="qr-image" src="${qrUrl}" alt="QR Code" />

    <div class="instructions">
  <strong>How to Redeem Your ShopKya Coins Instantly?</strong>
  <div class="instructions-content">
    1. Open Shopkya app → Profile → My Rewards<br/>
    2. Tap Redeem → Enter Coins to Redeem → <br/>Select ‘Redeem in Store’<br/>
    3. Scan this barcode at checkout<br/><br/>
    Enjoy your Loyalty Discount!
  </div>
</div>

  </body>
</html>
`);
          printWindow.document.close();
          printWindow.focus();
          // Wait to ensure image is loaded before printing
          printWindow.onload = () => {
            printWindow.print();
            printWindow.close();
          };
        }}
      />
    </div>
  </div>
)}



    </div>



  );
}

MainMenu.propTypes = {

  open: PropTypes.array.isRequired,
  openSubMenu: PropTypes.func.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  dataMenu: PropTypes.array.isRequired,
};

const openAction = (key, keyParent) => ({ type: 'OPEN_SUBMENU', key, keyParent });

const mapStateToProps = state => ({
  open: state.ui.subMenuOpen
});

const mapDispatchToProps = dispatch => ({
  openSubMenu: bindActionCreators(openAction, dispatch)
});

const MainMenuMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);

export default MainMenuMapped;
