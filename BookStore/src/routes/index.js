const { Router } = require("express");

const { PayMercado } = require("./MercadoPago");

const { booksRoutes } = require("./Books");

const { Whatsapp } = require("./Whatsapp");

const {StripePay} = require('./Stripe');

const { commentsRoutes } = require("./Comments");

const {routeUsers} = require("./user.js")

const { ChatGptRoute } = require("./ChatGpt");

const { Pays } = require("./Pays")

const {Freebooks} = require("./FreeBook.js")

const {routeSettings} =require("./SettingBook.js");

const { freemem } = require("os");

const router = Router();

//TODO Espacio de Dany Ruiz************************************************************************************************
//Mercado Pago

router.use("/", PayMercado);

//Whatssap

router.use("/", Whatsapp);

//Stripe

router.use('/', StripePay)


//ChatGpt

router.use('/', ChatGptRoute)

//Pays

router.use('/', Pays)

// Ruta de libros Free

router.use("/",Freebooks)
//TODO Espacio de Dany Ruiz************************************************************************************************

//TODO Espacio de Jose A Fuenmayor*****************************************************************************************
//************Books**************
router.use("/", booksRoutes);

router.use("/", commentsRoutes);

//TODO Espacio de Jose A Fuenmayor*****************************************************************************************

router.use("/", routeUsers);
router.use("/", routeSettings);



module.exports = router;
