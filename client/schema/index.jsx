import { z } from "zod"

export const RegisterSchema = z.object ({
    username: z.string().min(3,{
        message:"Username must be at least 3 characters long."
    }).max(20),
    email: z.string().email({
        message: 'Please enter a valid e-mail address'
    }),
    password: z.string().min(4,{
        message:'Password should contain at least 4 characters.'
    }),
    confirmPassword: z.string().min(4,{
        message:'Password should contain at least 4 characters.'
    }),
})

export const LoginSchema = z.object ({
    email: z.string().email({
        message: 'Please enter a valid e-mail address'
    }),
    password: z.string().min(4,{
        message:'Password should contain at least 4 characters.'
    })
})

export const addEmployeeSchema = z.object({
    firstName: z.string().min(1, {
        message: 'First name is required'
    }),
    lastName: z.string().min(1, {
        message: 'Last name is required'
    }),
    email: z.string().email({
        message: 'Please enter a valid e-mail address'
    }),
    phone: z.string().min(1, {
        message: 'Phone number is required'
    }),
    city: z.string().min(1, {
        message: 'City is required'
    }),
    password: z.string().min(4, {
        message: 'Password should contain at least 4 characters.'
    }),
});

export const updateEmployeeSchema = z.object({
    firstName: z.string().min(1, {
        message: 'First name is required'
    }),
    lastName: z.string().min(1, {
        message: 'Last name is required'
    }),
    email: z.string().email({
        message: 'Please enter a valid e-mail address'
    }),
    phone: z.string().min(1, {
        message: 'Phone number is required'
    }),
    city: z.string().min(1, {
        message: 'City is required'
    }),
    password: z.string().min(4, {
        message: 'Password should contain at least 4 characters.'
    }),
});

export const addVehicleSchema = z.object({
    name: z.string().min(1, {
        message: 'Name is required'
    }),
    make: z.string().min(1, {
        message: 'Make is required'
    }),
    model: z.string().min(1, {
        message: 'Model is required'
    }),
    year: z.number().min(1900, {
        message: 'Year should be after 1900'
    }),
    vin: z.string().min(1, {
        message: 'VIN is required'
    }),
    registrationNumber: z.string().min(1, {
        message: 'Registration number is required'
    }),
    fuelType: z.enum(['Petrol', 'Diesel', 'Electric', 'Hybrid'], {
        message: 'Please select a valid fuel type'
    }),
    transmission: z.enum(['Manual', 'Automatic'], {
        message: 'Please select a valid transmission type'
    }),
    color: z.string().min(1, {
        message: 'Color is required'
    }),
    seatingCapacity: z.number().min(1, {
        message: 'Seating capacity should be at least 1'
    }),
    pricePerDay: z.number().min(0, {
        message: 'Price per day should be at least 0'
    }),
    pricePerHour: z.number().min(0, {
        message: 'Price per hour should be at least 0'
    }),
    available: z.boolean(),
    image: z.string().url({
        message: 'Please provide a valid URL for the image'
    }),
    features: z.object({
        airConditioning: z.boolean(),
        gps: z.boolean(),
        bluetooth: z.boolean(),
        usbPort: z.boolean(),
        sunroof: z.boolean()
    }),
    responsibleEmployee: z.string({
        message: 'Responsible employee ID is required and should be a valid UUID'
    }),
    zone: z.string({
        message: 'Zone ID should be a valid UUID'
    }),
});

export const updateVehicleSchema = z.object({
    name: z.string().min(1, {
        message: 'Name is required'
    }),
    make: z.string().min(1, {
        message: 'Make is required'
    }),
    model: z.string().min(1, {
        message: 'Model is required'
    }),
    year: z.number().min(1900, {
        message: 'Year should be after 1900'
    }),
    vin: z.string().min(1, {
        message: 'VIN is required'
    }),
    registrationNumber: z.string().min(1, {
        message: 'Registration number is required'
    }),
    fuelType: z.enum(['Petrol', 'Diesel', 'Electric', 'Hybrid'], {
        message: 'Please select a valid fuel type'
    }),
    transmission: z.enum(['Manual', 'Automatic'], {
        message: 'Please select a valid transmission type'
    }),
    color: z.string().min(1, {
        message: 'Color is required'
    }),
    seatingCapacity: z.number().min(1, {
        message: 'Seating capacity should be at least 1'
    }),
    pricePerDay: z.number().min(0, {
        message: 'Price per day should be at least 0'
    }),
    pricePerHour: z.number().min(0, {
        message: 'Price per hour should be at least 0'
    }),
    available: z.boolean(),
    image: z.string().url({
        message: 'Please provide a valid URL for the image'
    }),
    features: z.object({
        airConditioning: z.boolean(),
        gps: z.boolean(),
        bluetooth: z.boolean(),
        usbPort: z.boolean(),
        sunroof: z.boolean()
    }),
    responsibleEmployee: z.string({
        message: 'Responsible employee ID is required and should be a valid UUID'
    }),
    zone: z.string({
        message: 'Zone ID should be a valid UUID'
    }),
});
