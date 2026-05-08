import React, { useState, useEffect } from 'react';
import { Paper, Grid, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import brand from 'dan-api/dummy/brand';
import { Helmet } from 'react-helmet';
import AppConfig from "../../App/constants/config";


export default function AccountAndSettings() {

    const title = brand.name + ' - Account and Settings';
    const description = brand.desc;
    const baseUrl = AppConfig.baseUrl
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            shop_name: '',
            street: '',
            zip_code: '',
            city: '',
            state: '',
            phone_no: '',
        },
        validationSchema: Yup.object().shape({
            shop_name: Yup.string().required('Shop Name is required'),
            street: Yup.string().required('Street is required'),
            zip_code: Yup.string().required('Zip Code is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            phone_no: Yup.string().required('Phone number is required'),
        }),
        onSubmit: async (values) => {
            try {
                const { data } = await axios.post(
                    `${baseUrl}/shop/edit_shop_details`, values,
                    {
                        headers: { authorization: token },
                    }
                );

                if (data.error) {
                    toast(data.title || "Update failed");
                } else {
                    toast("Shop details updated successfully!");
                }
            } catch (error) {
                toast.error("Something went wrong!");
                console.error(error);
            }
        },
    });


    console.log(formik.errors);
    const fetchShopDetails = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${baseUrl}/shop/shop_details`, {
                headers: { authorization: token }
            });
            if (!data.error && data.shop) {
                const shop = data.shop;
                formik.setValues({
                    shop_name: shop.shop_name || '',
                    street: shop.street || '',
                    zip_code: shop.zip_code || '',
                    city: shop.city || '',
                    state: shop.state || '',
                    phone_no: shop.phone_no || '',
                });
            } else {
                toast(data.title || "Failed to fetch shop details");
            }
        } catch (error) {
            console.error(error);
            toast("Something went wrong while fetching details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShopDetails();
    }, []);

    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
            </Helmet>
            <Paper sx={{ p: 4 }}>
                <section>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            {/* Row 1 */}
                            <Grid item xs={12} md={4}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    name="shop_name"
                                    label="Shop Name"
                                    value={formik.values.shop_name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    name="street"
                                    label="Street"
                                    value={formik.values.street}
                                    onChange={formik.handleChange}
                                    error={formik.touched.street && Boolean(formik.errors.street)}
                                    helperText={formik.touched.street && formik.errors.street}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    name="zip_code"
                                    label="Zip Code"
                                    value={formik.values.zip_code}
                                    onChange={formik.handleChange}
                                    error={formik.touched.zip_code && Boolean(formik.errors.zip_code)}
                                    helperText={formik.touched.zip_code && formik.errors.zip_code}
                                />
                            </Grid>

                            {/* Row 2 */}
                            <Grid item xs={12} md={4}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    name="city"
                                    label="City"
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    error={formik.touched.city && Boolean(formik.errors.city)}
                                    helperText={formik.touched.city && formik.errors.city}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    name="state"
                                    label="State"
                                    value={formik.values.state}
                                    onChange={formik.handleChange}
                                    error={formik.touched.state && Boolean(formik.errors.state)}
                                    helperText={formik.touched.state && formik.errors.state}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    name="phone_no"
                                    label="Phone Number"
                                    value={formik.values.phone_no}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone_no && Boolean(formik.errors.phone_no)}
                                    helperText={formik.touched.phone_no && formik.errors.phone_no}
                                />
                            </Grid>
                        </Grid>

                        <div style={{ marginTop: '20px' }}>
                            {/* <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button> */}
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={!(formik.isValid && formik.dirty)}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </section>
            </Paper>
        </div>
    );
}
