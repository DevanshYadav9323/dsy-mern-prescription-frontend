import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';


const useStyles = makeStyles()((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
        height: 110,
        marginBottom: 6,
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            height: 97,
            marginBottom: -1,
            alignItems: 'flex-end',
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
        '& > *': {
            padding: '0 5px'
        }
    },
    title: {
        color: theme.palette.common.white,
        fontSize: 14,
        [theme.breakpoints.up('sm')]: {
            fontSize: 13,
        },
        fontWeight: 400
    },
    counter: {
        color: theme.palette.common.white,
        fontSize: 21,
        fontWeight: 400
    },
    customContent: {
        textAlign: 'right'
    }
}));
function CounterWidget(props) {
    const {
        classes
    } = useStyles();
    const {
        color,
        start,
        end,
        duration,
        title,
        children,
        unitBefore,
        unitAfter
    } = props;
    const formatter = (value) => value.toString().replace(/,/g, '');
    return (
        <Paper className={classes.root} style={{ backgroundColor: color, height: "100%" , minHeight: '112px', padding: "10px"}}>
            <div>
                <Typography className={classes.counter} style={{fontSize: "28px"}}>
                    {unitBefore}
                    <CountUp separator=" " className='ActivityTitleCount' start={start} end={end} duration={duration} useEasing 
                    // decimals={2}
                        // decimal=","
                    />
                    {/* {unitAfter} <span className='ActivityTitleCount'>€</span> */}
                </Typography>
                <Typography className={classes.title} style={{fontSize: "16px"}}>{title}</Typography>
            </div>
            <div className={classes.customContent}>
                {children}
            </div>
        </Paper>
    );
}
CounterWidget.propTypes = {
    color: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    unitBefore: PropTypes.string,
    unitAfter: PropTypes.string,
};
CounterWidget.defaultProps = {
    unitBefore: '',
    unitAfter: '',
};
export default CounterWidget;