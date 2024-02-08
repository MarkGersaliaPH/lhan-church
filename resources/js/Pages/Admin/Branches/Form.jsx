import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import Card, { CardBody, CardFooter } from "@/Components/Card";
import FormInput from "@/Components/FormInput";

function Form({ auth, item }) {
    const {
        data,
        setData,
        errors,
        put,
        reset,
        post,
        processing,
        recentlySuccessful,
    } = useForm(item || {});

    const baseUrl = "admin.branches";

    const submit = (e) => {
        e.preventDefault();

        if (data.id) {
            put(route(`${baseUrl}.update`, data.id), {
                preserveScroll: true,
                onSuccess: () => reset(),
            });
        } else {
            post(route(`${baseUrl}.store`), {
                preserveScroll: true,
                onSuccess: () => reset(),
            });
        }
    };

    const handleChange = (e) => { 
        setData(e.target.name, e.target.type == "checkbox" ? e.target.checked : e.target.value);
    };
    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Branches
                    </h2>
                }
            >
                <Head title="Branches Form" />

                <div className="py-5">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div
                            className={`grid grid-cols-1 ${
                                data.id && "md:grid-cols-3"
                            } gap-4`}
                        >
                            <div className="col-span-1 md:col-span-2">
                                <Card className="mb-5">
                                    <CardBody> 
                                            <FormInput
                                                name="address"
                                                label="Address"
                                                value={data.address}
                                                error={errors.address}
                                                onChange={handleChange}
                                            /> 
                                            <FormInput
                                                name="head_pastor"
                                                label="Head Pastor"
                                                value={data.head_pastor}
                                                error={errors.head_pastor}
                                                onChange={handleChange} 
                                            />  
                                            <FormInput
                                                name="description"
                                                label="Description"
                                                value={data.description}
                                                error={errors.description}
                                                onChange={handleChange}
                                                type="textarea"
                                            /> 
                                            <FormInput
                                                name="is_main"
                                                label="Is main branch"
                                                value={data.is_main}
                                                error={errors.is_main}
                                                onChange={handleChange}
                                                type="checkbox"
                                            /> 
                                    </CardBody>
                                    <CardFooter>
                                        <PrimaryButton
                                            className="mr-2"
                                            onClick={submit}
                                        >
                                            Submit
                                        </PrimaryButton>
                                        <SecondaryButton
                                            onClick={() =>
                                                router.visit(
                                                    route(`${baseUrl}.index`)
                                                )
                                            }
                                        >
                                            Cancel
                                        </SecondaryButton>
                                    </CardFooter>
                                </Card>
                            </div>

                            {data.id && (
                                <div className="col-span-1 md:col-span-1">
                                    <Card>
                                        <CardBody>
                                            <table className="w-full">
                                                <tr>
                                                    <th className="p-2 text-left">
                                                        Created at
                                                    </th>
                                                    <td className="p-2">
                                                        {data.created_at}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="p-2 text-left">
                                                        Last Updated{" "}
                                                    </th>
                                                    <td className="p-2">
                                                        {data.updated_at}
                                                    </td>
                                                </tr>
                                            </table>
                                        </CardBody>
                                    </Card>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}

export default Form;