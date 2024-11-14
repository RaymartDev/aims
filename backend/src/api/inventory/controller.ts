/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { findInventoryById, insertInventory, listInventories, reportInventory, searchInventory, updateInventory } from './service';
import ExcelJS from 'exceljs';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const newInventory = await insertInventory({ modified_by_id: req.user?.id || 1, ...req.body });
    if (newInventory) {
      res.status(200).json({ inventory: newInventory, message: 'Successfully created inventory' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Inventory ID is required!' });
    }
    const inventory = await findInventoryById(parseInt(id));
    if (!inventory) {
      return res.status(400).json({ message: 'Inventory not found' });
    }

    res.status(200).json({ inventory, message: 'Successfully found inventory' });
  } catch (err) {
    next(err);
  }
};

export const exportData = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { start, end } = req.query;

    const report = await reportInventory(new Date(String(start)), new Date(String(end)));

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Inventory Report');

    // Define the headers and map them to the object properties
    worksheet.columns = [
      { header: 'Inventory ID', key: 'inventoryId', width: 15 },
      { header: 'Total Balance', key: 'total_balance', width: 15 },
      { header: 'Remaining Balance', key: 'remaining_balance', width: 15 },
      { header: 'Quantity Out', key: 'quantity_out', width: 15 },
      { header: 'Available', key: 'available', width: 15 },
      { header: 'Return', key: 'return', width: 15 },
      { header: 'Material Description', key: 'material_description', width: 20 },
      { header: 'Material Item Code', key: 'material_item_code', width: 20 },
      { header: 'Material Brand', key: 'material_brand', width: 20 },
      { header: 'Material Type', key: 'material_type', width: 20 },
      { header: 'Material Category', key: 'material_category', width: 20 },
      { header: 'Material UOM', key: 'material_uom', width: 15 },
      { header: 'Date Entry', key: 'material_date_entry', width: 15 },
      { header: 'End Warranty', key: 'material_end_warranty', width: 15 },
      { header: 'Serial', key: 'material_serial', width: 20 },
      { header: 'Asset Number', key: 'material_asset', width: 20 },
      { header: 'Modified By', key: 'modified_by', width: 15 },
      { header: 'Employee Number', key: 'modified_by_employee_number', width: 20 },
      { header: 'Cost Code', key: 'modified_by_cost_code', width: 15 },
      { header: 'Department', key: 'modified_by_department', width: 20 },
      { header: 'Company', key: 'modified_by_company', width: 20 },
    ];

    // Add each item in the report to the worksheet
    report.forEach((item) => {
      worksheet.addRow(item);
    });

    // Prepare the response to download the Excel file
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="Inventory_Report_${start}_${end}.xlsx"`,
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    next(err);
  }
};

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Inventory ID is required!' });
    }

    const findInventory = await findInventoryById(parseInt(id));
    if (!findInventory) {
      return res.status(400).json({ message: 'Inventory not found' });
    }

    const newInventory = await updateInventory({ modified_by_id: req.user?.id || 1, ...req.body }, parseInt(id));
    if (newInventory) {
      res.status(200).json({ inventory: newInventory, message: 'Successfully updated inventory' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};

export const search = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { inventory } = req.query;

    if (!inventory || typeof inventory !== 'string') {
      return res.status(400).json({ error: 'Inventory query parameter is required and must be a string' });
    }
    const inventories = await searchInventory(inventory as string);
    res.status(200).json({ inventories, message: 'Successfully found inventories' });
  } catch (err) {
    next(err);
  }
};

export const list = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 17;
    if (isNaN(page) || page < 1) {
      page = 1;
    }

    const inventories = await listInventories(page, limit);
    if (inventories) {
      res.status(200).json({
        inventories: inventories.inventoriesFinal, message: 'Successfully retrieved inventories', misc: {
          page,
          limit,
          maxPage: inventories.maxPage || 1,
        },
      });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};

export const toggleActivate = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Inventory ID is required!' });
    }

    const findInventory = await findInventoryById(parseInt(id));
    if (!findInventory) {
      return res.status(400).json({ message: 'Inventory not found' });
    }

    const today = new Date();
    const effectiveTo = new Date(findInventory.effective_to);

    let newEffectiveTo;
    let message;
    if (effectiveTo <= today) {
      // If effective_to is less than or equal to today, set it to 2099-12-31
      newEffectiveTo = new Date('2099-12-31');
      message = 'Successfully activated inventory';
    } else {
      // Otherwise, set it to today's date
      newEffectiveTo = new Date('2019-12-31');
      message = 'Successfully de-activated inventory';
    }

    const newInventory = await updateInventory({ modified_by_id: req.user?.id || 1, effective_to: newEffectiveTo }, parseInt(id));

    return res.status(200).json({ inventory: newInventory, message });
  } catch (err) {
    next(err);
  }
};