import axios from "axios";
import dotenv from "dotenv";
import { response } from "express";
dotenv.config({path:"../../.env"});

export const customer = async(req,res)=>{

    try{
        const url=`${process.env.CUSTOMER_SERVICE_URL}${req.originalUrl.replace("/customer","")}`;
        console.log(url);
        const response = await axios({
            method:req.method,
            url,
            data:req.body,
            headers:{
                Authorization:req.headers.authorization,
                'Content-Type':req.headers['content-type']
            }
        });
        res.status(response.status).json(response.data);
    }catch(error){
        console.error("Customer proxy server error",error.message);
        res.status(error.response ? error.response.status:500).json({error:error.message});
    }
}

export const farmer =async(req,res)=>{
    try{
        const url=`${process.env.FARMER_SERVICE_URL}${req.originalUrl.replace("/farmer","")}`;
        console.log(url);
        const reponse = await axios({
            method:req.method,
            url,
            data:req.body,
            params:req.query,
            header:{
                Authorization:req.headers.authorization,
                'Content-Type':req.headers['content-type']
            }
        });
        res.status(response.status).json(response.data);
    }catch(error){
        console.error("Farmer proxy error",error.message);
        res.status(error.response?error.response.status:500).json({error:error.message});
    }
}

export const logistics = async(req,res)=>{

    try {
        const url = `${process.env.LOGISTIC_SERVICE_URL}${req.originalUrl.replace("/logistics", "")}`;
        console.log(url);
        const response = await axios({
          method: req.method,
          url,
          data: req.body,
          params: req.query,
          headers: {
            // Forward the Authorization header from the incoming request
            Authorization: req.headers.authorization,
            // Optionally, forward other headers as needed (e.g., Content-Type)
            'Content-Type': req.headers['content-type']
          }
        });
        res.status(response.status).json(response.data);
      } catch (error) {
        console.error("Admin proxy error:", error.message);
        res
          .status(error.response ? error.response.status : 500)
          .json({ error: error.message });
      }
}