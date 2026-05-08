import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Type from 'dan-styles/Typography.scss';
import Rating from '../Rating/Rating';
import useStyles from './cardStyle-jss';
import AddIcon from '@mui/icons-material/Add';
function ProductCard(props) {
  const { classes, cx } = useStyles();
  const smUp = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const {
    discount,
    soldout,
    thumbnail,
    name,
    desc,
    ratting,
    price,
    prevPrice,
    list,
    detailOpen,
    handleAddVariant,
    data
  } = props;

  return (
    <Card className={cx(classes.cardProduct, smUp && list ? classes.cardList : '')} style={{height:300,width:180}}>
      <div className={classes.status}>
        {discount !== '' && (
          <Chip label={'Discount ' + discount} className={classes.chipDiscount} />
        )}
        {soldout && (
          <Chip label="Sold Out" className={classes.chipSold} />
        )}
      </div>
      <CardMedia
        className={classes.mediaProduct}
        image={thumbnail}
        title={name}
      />
      <CardContent className={classes.floatingButtonWrap}>
        {!soldout && (
          <Tooltip title="Add to cart" placement="top">
            <Fab onClick={() => handleAddVariant(data)} size="small" color="secondary" aria-label="add" className={classes.buttonAdd}>
              <AddIcon />
            </Fab>
          </Tooltip>
        )}
        <Typography noWrap variant="h7" className={classes.title} component="h5">
          {name}
        </Typography>
        <Typography component="p" >
          {desc}
        </Typography>
        <Typography component="p" >
          <span>
            ₹
            {price}
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  discount: PropTypes.string,
  soldout: PropTypes.bool,
  thumbnail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  // ratting: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  prevPrice: PropTypes.number,
  list: PropTypes.bool,
  detailOpen: PropTypes.func,
  addToCart: PropTypes.func,
};

ProductCard.defaultProps = {
  discount: '',
  soldout: false,
  prevPrice: 0,
  list: false,
  detailOpen: () => (false),
  addToCart: () => (false),
};

export default ProductCard;
