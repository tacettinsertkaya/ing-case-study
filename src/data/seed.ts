import { Employee } from "./employee";

export const EmployeeSeed:Array<Employee> = [
   {
     firstName: 'Ada',
     lastName: 'Lovelace',
     dob: '1990-12-10',
     doe: '2015-01-05',
     phone: '5551234567',
     email: 'ada@example.com',
     department: 'Tech',
     position: 'Senior'
   },
   {
     firstName: 'Grace',
     lastName: 'Hopper',
     doe: '2016-02-15',
     dob: '1985-01-12',
     phone: '5559876543',
     email: 'grace@example.com',
     department: 'Analytics',
     position: 'Senior'
   },
   {
     firstName: 'Alan',
     lastName: 'Turing',
     doe: '2018-03-20',
     dob: '1992-06-23',
     phone: '5552223333',
     email: 'alan@example.com',
     department: 'Tech',
     position: 'Medior'
   },
   {
     firstName: 'Hedy',
     lastName: 'Lamarr',
     doe: '2019-04-25',
     dob: '1993-11-09',
     phone: '5557778888',
     email: 'hedy@example.com',
     department: 'Analytics',
     position: 'Junior'
   }
];
