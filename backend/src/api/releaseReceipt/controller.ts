/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { createAndCancelRelease, createReleaseReceiver, createReleaseShipper, findReleaseByNumber, getReferenceNumber, insertRelease, listReleases, received, reportRelease, searchReleaseByRef, searchReleaseByRefCompleted, shipped, updateRelease } from './service';
import { findUserByEmployeeId, findUserByStoreId } from '../user/service';
import { findCompanyById } from '../company/service';
import { findDepartmentById } from '../department/service';
import ExcelJS from 'exceljs';


export const list = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 17;
    if (isNaN(page) || page < 1) {
      page = 1;
    }
  
    const releases = await listReleases(page, limit);
    if (releases) {
      res.status(200).json({
        releases: releases.releasesFinal, message: 'Successfully retrieved releases', misc: {
          page,
          limit,
          maxPage: releases.maxPage || 1,
        },
      });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};

export const cancel = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { materialIds, relead_to, date_out } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Release ID is required!' });
    }

    await createAndCancelRelease(Number(id), materialIds, relead_to, new Date(date_out));
    res.status(200).json({ message: 'Release cancelled successfully' });
  } catch (err) {
    next(err);
  }
};

export const ship = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Release ID is required!' });
    }
  
    const findRelease = await findReleaseByNumber(isNaN(parseInt(id)) ? 0 : parseInt(id));
    if (!findRelease) {
      return res.status(404).json({ message: 'Release not found' });
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { employee_no, date, name, cost_code, department_id, company_id } = req.body;
    
    const findCompany = await findCompanyById(company_id);
    if (!findCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const findDepartment = await findDepartmentById(department_id);
    if (!findDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }
    
    const shipRelease = await createReleaseShipper({ employee_no, shipped_date: new Date(date), name, cost_center_code: cost_code, department_id, company_id });
    if (!shipRelease) {
      return res.status(500).json({ message: 'Unable to create ship data' });
    }
    
    const isReceived = await received(isNaN(parseInt(id)) ? 0 : parseInt(id));

    const updatedRelease = await updateRelease({ release_shipped_id: shipRelease.id, status: isReceived ? 3 : 1 }, isNaN(parseInt(id)) ? 0 : parseInt(id));

    res.status(202).json({ message: 'Successfully updated release status to shipped!', release: updatedRelease, shipRelease });
  } catch (err) {
    next(err);
  }
};

export const receive = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ message: 'Release ID is required!' });
    }
    
    const findRelease = await findReleaseByNumber(isNaN(parseInt(id)) ? 0 : parseInt(id));
    if (!findRelease) {
      return res.status(404).json({ message: 'Release not found' });
    }
  
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { employee_no, date, name, cost_code, department_id, company_id } = req.body;
      
    const findCompany = await findCompanyById(company_id);
    if (!findCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
  
    const findDepartment = await findDepartmentById(department_id);
    if (!findDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }
      
    const receiveRelease = await createReleaseReceiver({ employee_no, receive_date: new Date(date), name, cost_center_code: cost_code, department_id, company_id });
    if (!receiveRelease) {
      return res.status(500).json({ message: 'Unable to create receive data' });
    }

    const isShipped = await shipped(isNaN(parseInt(id)) ? 0 : parseInt(id)); 
  
    const updatedRelease = await updateRelease({ release_receiver_id: receiveRelease.id, status: isShipped ? 3 : 2 }, isNaN(parseInt(id)) ? 0 : parseInt(id));
  
    res.status(202).json({ message: 'Successfully updated release status to received!', release: updatedRelease, receiveRelease });
  } catch (err) {
    next(err);
  }
};

export const exportData = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { start, end } = req.query;

    const report = await reportRelease(new Date(String(start)), new Date(String(end)));

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Release Report');
    
    // Define the headers and map them to the object properties
    worksheet.columns = [
      { header: 'Release Number', key: 'release_number', width: 15 },
      { header: 'Shipped By', key: 'shipped_by', width: 20 },
      { header: 'Shipped Date', key: 'shipped_date', width: 20 },
      { header: 'Receiver', key: 'receiver', width: 20 },
      { header: 'Receive Date', key: 'receive_date', width: 20 },
      { header: 'Material Description', key: 'material_description', width: 30 },
      { header: 'Material Item Code', key: 'material_item_code', width: 20 },
      { header: 'Material Quantity', key: 'material_quantity', width: 15 },
      { header: 'Remarks', key: 'remarks', width: 20 },
      { header: 'Return Number', key: 'return_number', width: 15 },
      { header: 'Return Remarks', key: 'return_remarks', width: 20 },
      { header: 'Requestor Name', key: 'requestor_name', width: 20 },
      { header: 'Requestor Employee Number', key: 'requestor_emp_no', width: 25 },
      { header: 'Modified On', key: 'modified_on', width: 20 },
      { header: 'Modified By', key: 'modified_by', width: 20 },
      { header: 'Modified By Employee Number', key: 'modified_by_emp_no', width: 35 },
      { header: 'Modified By Cost Code', key: 'modified_by_cost_code', width: 35 },
    ];

    // Add each item in the report to the worksheet
    report.forEach((item) => {
      item.release_detail.forEach((detail) => {
        const row = {
          release_number: item.release_number,
          shipped_by: item.release_shipped?.name || '',
          shipped_date: item.release_shipped?.shipped_date || '',
          receiver: item.release_receiver?.name || '',
          receive_date: item.release_receiver?.receive_date || '',
          material_description: detail.material.description,
          material_item_code: detail.material.item_code,
          material_quantity: detail.quantity,
          remarks: detail.remarks,
          return_number: item.return[0]?.return_number || '',
          return_remarks: item.return[0]?.remarks || '',
          requestor_name: item.requestor?.name || '',
          requestor_cost_code: item.requestor.cost_center_code || '',
          requestor_emp_no: item.requestor.employee_no || '',
          modified_on: item.modified_on || '',
          modified_by: item.modified_by?.name || '',
          modified_by_emp_no: item.modified_by?.employee_no || '',
          modified_by_cost_code: item.modified_by?.cost_center_code || '',
        };
        worksheet.addRow(row);
      });
    });

    // Prepare the response to download the Excel file
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="Release_Report_${start}_${end}.xlsx"`,
    );

    // Write the workbook to the response stream
    await workbook.xlsx.write(res);
    res.end();
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

export const search = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { release } = req.query;
  
    if (!release || isNaN(Number(release))) {
      return res.status(400).json({ error: 'Type query parameter is required and must be a number' });
    }
    const releases = await searchReleaseByRef(String(release));
    res.status(200).json({ releases, message: 'Successfully found release' });
  } catch (err) {
    next(err);
  }
};

export const searchCompleted = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { release } = req.query;
  
    if (!release || isNaN(Number(release))) {
      return res.status(400).json({ error: 'Type query parameter is required and must be a number' });
    }
    const releases = await searchReleaseByRefCompleted(String(release));
    res.status(200).json({ releases, message: 'Successfully found release' });
  } catch (err) {
    next(err);
  }
};

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let user_id = -1;
    if (req.body?.option === 'employee') {
      const findEmployee = await findUserByEmployeeId(req.body.id);
      if (findEmployee) {
        user_id = findEmployee.id;
      }
    } else {
      const findStore = await findUserByStoreId(req.body.id);
      if (findStore) {
        user_id = findStore.id;
      }
    }

    if (user_id === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const newRelease = await insertRelease({ modified_by_id: req.user?.id || 1, ...req.body.release }, {
      detail: req.body.release_detail,
    }, user_id);
    if (newRelease) {
      res.status(200).json({ release: newRelease, message: 'Successfully created release' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};