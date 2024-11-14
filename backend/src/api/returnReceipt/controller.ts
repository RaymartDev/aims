import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { getReferenceNumber, insertReturn, listReturns, reportReturn, searchReturnByRef } from './service';
import { findUserById } from '../user/service';
import ExcelJS from 'exceljs';

export const list = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 17;
    if (isNaN(page) || page < 1) {
      page = 1;
    }
    
    const returns = await listReturns(page, limit);
    if (returns) {
      res.status(200).json({
        returns: returns.returnsFinal, message: 'Successfully retrieved returns', misc: {
          page,
          limit,
          maxPage: returns.maxPage || 1,
        },
      });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};

export const getReference = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const reference = await getReferenceNumber();
    res.status(200).json({ reference });
  } catch (err) {
    next(err);
  }
};

export const exportData = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { start, end } = req.query;

    // Fetch the report data
    const returnsReport = await reportReturn(new Date(String(start)), new Date(String(end)));

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Returns Report');

    // Define the headers and map them to the object properties
    worksheet.columns = [
      { header: 'Return Number', key: 'return_number', width: 15 },
      { header: 'Tag', key: 'tag', width: 20 },
      { header: 'Remarks', key: 'remarks', width: 20 },
      { header: 'Reason', key: 'reason', width: 20 },
      { header: 'Requestor', key: 'requestor_name', width: 25 },
      { header: 'Requestor Employee number', key: 'requestor_emp_no', width: 25 },
      { header: 'Requestor Cost Center', key: 'requestor_cost_code', width: 25 },
      { header: 'Release Number', key: 'release_number', width: 15 },
      { header: 'Release Date', key: 'release_date', width: 15 },
      { header: 'Material Description', key: 'material_description', width: 20 },
      { header: 'Material Item Code', key: 'material_item_code', width: 20 },
      { header: 'Material Brand', key: 'material_brand', width: 20 },
      { header: 'Material Type', key: 'material_type', width: 20 },
      { header: 'Material Category', key: 'material_category', width: 20 },
      { header: 'Quantity', key: 'quantity', width: 15 },
      { header: 'Modified By', key: 'modified_by', width: 20 },
      { header: 'Modified By Employee Number', key: 'modified_by_emp_no', width: 35 },
      { header: 'Modified By Cost Code', key: 'modified_by_cost_code', width: 35 },
    ];

    // Add each return item and its details to the worksheet
    returnsReport.forEach((item) => {
      item.return_detail.forEach((detail) => {
        worksheet.addRow({
          return_number: item.return_number,
          tag: item.tag,
          remarks: item.remarks,
          reason: item.reason,
          requestor_name: item.requestor.name,
          requestor_emp_no: item.requestor.employee_no,
          requestor_cost_code: item.requestor.cost_center_code,
          release_number: item.release.release_number,
          release_date: item.release.date_out,
          material_description: detail.material.description,
          material_item_code: detail.material.item_code,
          material_brand: detail.material.brand_model,
          material_type: detail.material.type.description,
          material_category: detail.material.category.description,
          quantity: detail.quantity,
          modified_by: item.modified_by?.name || '',
          modified_by_emp_no: item.modified_by?.employee_no || '',
          modified_by_cost_code: item.modified_by?.cost_center_code || '',
        });
      });
    });

    // Prepare the response to download the Excel file
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="Returns_Report_${start}_${end}.xlsx"`,
    );

    // Write the workbook to the response stream
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    next(err);
  }
};

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const findUser = await findUserById(Number(req.body.assigned_id));
  
    if (!findUser) {
      return res.status(404).json({ message: 'User not found' });
    }
      
    const newReturn = await insertReturn({ ...req.body.return }, {
      detail: req.body.return_detail,
    }, findUser.id, req.user?.id || 1);
    if (newReturn) {
      res.status(200).json({ return: newReturn, message: 'Successfully created return' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};

export const search = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { returnQuery } = req.query;
  
    if (!returnQuery || isNaN(Number(returnQuery))) {
      return res.status(400).json({ error: 'Type query parameter is required and must be a number' });
    }
    const returns = await searchReturnByRef(String(returnQuery));
    res.status(200).json({ returns, message: 'Successfully found return' });
  } catch (err) {
    next(err);
  }
};