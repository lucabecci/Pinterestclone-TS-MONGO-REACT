import { Request, Response, Handler } from "express";
import fs from "fs-extra";
import path from "path";

import Image from "../models/Image";
import { bodyCheck, createCheckCamps, IDCheck } from "../helpers/photo.checks";

const getImages: Handler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const images = await Image.find();
    return res.status(200).json({
      success: true,
      images,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try later.",
    });
  }
};

const createImage: Handler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { title, description } = req.body;
    const newImage = {
      title,
      description,
      imagePath: req.file.path,
    };
    const checked = createCheckCamps(title, description, req.file.path);
    if (checked === true) {
      return res.json({
        success: false,
        message: "Check all camps",
      });
    }
    const image = await new Image(newImage);
    await image.save();

    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const getImage: Handler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: string = req.params.id;
    const checked = IDCheck(id);
    if (checked) {
      return res.status(400).json({
        success: false,
        message: "ID short, please use a valid ID",
      });
    }
    try {
      const image = await Image.findById(id);
      return res.status(200).json({
        success: true,
        image,
      });
    } catch (e) {
      return res.status(400).json({
        success: false,
        message: "ID invalid, please send a valid ID",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error, please try again or try later.",
    });
  }
};

const deleteImage: Handler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: string = req.params.id;
    const checked = IDCheck(id);
    if (checked) {
      return res.status(400).json({
        success: false,
        message: "ID short, please use a valid ID",
      });
    }
    const image = await Image.findByIdAndDelete(id);
    if (image) {
      await fs.unlink(path.resolve(image.imagePath));
      return res.status(200).json({
        success: true,
        image,
      });
    }
    return res.status(400).json({
      success: false,
      message:
        "ID image not found, please if you need delete a one image use the correct ID",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, please try again or try later",
    });
  }
};

const editImage: Handler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: string = req.params.id;
    const { title, description } = req.body;

    const idChecked = IDCheck(id);
    const bodyChecked = bodyCheck(title, description);

    if (idChecked) {
      return res.status(400).json({
        success: false,
        message: "ID short, please use a valid ID",
      });
    } else if (bodyChecked) {
      return res.status(400).json({
        success: false,
        message:
          "title or description not found, please complete all parameters",
      });
    }

    try {
      const updatedImage = await Image.findByIdAndUpdate(
        id,
        {
          title,
          description,
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        updatedImage,
      });
    } catch (e) {
      return res.status(400).json({
        success: false,
        message:
          "ID image not found, please if you need update an image use the correct ID",
      });
    }
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Internal server error, try later or try again",
    });
  }
};

export { createImage, getImages, deleteImage, editImage, getImage };
