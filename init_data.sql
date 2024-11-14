SET FOREIGN_KEY_CHECKS=0;

INSERT INTO `aims`.`Department`
(`id`,
`name`,
`deleted`,
`effective_from`,
`effective_to`,
`modified_on`,
`modified_by_id`)
VALUES
(1,
'Admin',
0,
now(),
'2099-12-01 08:00:00.000',
now(),
1);

INSERT INTO `aims`.`Company`
(`id`,
`name`,
`deleted`,
`effective_from`,
`effective_to`,
`modified_on`,
`modified_by_id`)
VALUES
(1,
'Admin',
0,
now(),
'2099-12-01 08:00:00.000',
now(),
1);

INSERT INTO `aims`.`Employee`
(`id`,
`first_name`,
`last_name`,
`division`,
`employee_no`,
`department_id`,
`cost_center_code`,
`company_id`,
`date_hired`,
`effective_from`,
`effective_to`,
`modified_on`,
`date_entry`,
`registered`,
`deleted`,
`modified_by_id`)
VALUES
(1,
'first',
'last',
'division',
'emp_no',
1,
'cost_code',
1,
now(),
now(),
'2099-12-01 08:00:00.000',
now(),
now(),
1,
0,
1);

INSERT INTO `aims`.`UserRole`
(`id`,
`name`,
`deleted`,
`effective_from`,
`effective_to`,
`modified_on`,
`modified_by_id`)
VALUES
(1,
'Employee',
0,
now(),
'2099-12-01 08:00:00.000',
now(),
1);

INSERT INTO `aims`.`UserRole`
(`id`,
`name`,
`deleted`,
`effective_from`,
`effective_to`,
`modified_on`,
`modified_by_id`)
VALUES
(2,
'Store',
0,
now(),
'2099-12-01 08:00:00.000',
now(),
1);

INSERT INTO `aims`.`UserRole`
(`id`,
`name`,
`deleted`,
`effective_from`,
`effective_to`,
`modified_on`,
`modified_by_id`)
VALUES
(3,
'Supplier',
0,
now(),
'2099-12-01 08:00:00.000',
now(),
1);

INSERT INTO `aims`.`UserType`
(`id`,
`name`,
`deleted`,
`effective_from`,
`effective_to`,
`modified_on`,
`modified_by_id`)
VALUES
(1,
'Employee',
0,
now(),
'2099-12-01 08:00:00.000',
now(),
1);


INSERT INTO `aims`.`UserType`
(`id`,
`name`,
`deleted`,
`effective_from`,
`effective_to`,
`modified_on`,
`modified_by_id`)
VALUES
(2,
'Store',
0,
now(),
'2099-12-01 08:00:00.000',
now(),
1);

INSERT INTO `aims`.`User`
(`id`,
`employee_id`,
`store_id`,
`role_id`,
`name`,
`username`,
`password`,
`department_id`,
`cost_center_code`,
`employee_no`,
`division`,
`deleted`,
`effective_from`,
`effective_to`,
`modified_on`,
`modified_by_id`)
VALUES
(1,
1,
null,
1,
'first last',
'admin',
'$2a$10$OALwOkj2w5rY3UbCtbf1Qub4.G7wSbbzOPdwSE7fayWkOzhVRKv7m',
1,
'cost_code',
'emp_no',
'division',
0,
now(),
'2099-12-01 08:00:00.000',
now(),
1);


SET FOREIGN_KEY_CHECKS=1;