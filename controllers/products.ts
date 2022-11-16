import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express';
import Controller from "./base";

const prisma = new PrismaClient();

const disconnectDB = async () => {
  await prisma.$disconnect();
}

class ProductsController extends Controller {
  public async index(req: Request, res: Response, next: NextFunction) {
    const products = await prisma.product.findMany();

    disconnectDB();

    return res.json({ products });
  }

  public async show(req: Request, res: Response, next: NextFunction) {
    const { productId } = req.params;

    const product = await prisma.product.findUnique({ where: { id: Number(productId) }});

    disconnectDB();

    return res.json({ product });
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const { nombre: name, descripcion: description, cantidad: amount, preciodecosto: original_price, preciodeventa: sale_price, urlproducto: url, idusuario: addedById } = req.body;

    if(!name || !description || !amount || !original_price || !sale_price || !url || !addedById) return res.status(400).json({ errors: ['Missing data'] });

    const product = await prisma.product.create({ data: { name, description, amount, original_price, sale_price, url, addedById }});

    disconnectDB();

    return res.json({ product });
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const { productId } = req.params;
    const { nombre: name, descripcion: description, cantidad: amount, preciodecosto: original_price, preciodeventa: sale_price, urlproducto: url, idusuario: addedById } = req.body;

    if(!productId) return res.status(400).json({ errors: ['Missing data'] });
    if(!name && !description && !amount && !original_price && !sale_price && !url) return res.status(400).json({ errors: ['Missing data'] });

    const product = await prisma.product.update({ where: { id: Number(productId) }, data: { name,
      description,
      amount,
      original_price,
      sale_price,
      url,
      addedById }});

    disconnectDB();

    return res.json({ product });
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    const { productId } = req.params;

    if(!productId) return res.status(400).json({ errors: ['Missing data'] });

    const product = await prisma.product.delete({ where: { id: Number(productId) }});

    disconnectDB();

    return res.json({ product });

  }
}

export default ProductsController;
