import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface SearchFormValues {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms: number;
}

const initialValues: SearchFormValues = {
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    rooms: 1,
};

const validationSchema =
    Yup.object({
        location: Yup.string()
            .trim()
            .required(
                "Location is required"
            ),

        checkIn: Yup.string()
            .required(
                "Check-in date is required"
            ),

        checkOut: Yup.string()
            .required(
                "Check-out date is required"
            )
            .test(
                "after-check-in",
                "Check-out must be after check-in",
                function (value) {
                    const {
                        checkIn,
                    } = this.parent;

                    if (!checkIn || !value) {
                        return true;
                    }

                    return (
                        new Date(value) >
                        new Date(checkIn)
                    );
                }
            ),

        guests: Yup.number()
            .integer()
            .min(1)
            .required(),

        rooms: Yup.number()
            .integer()
            .min(1)
            .required(),
    });

const SearchForm = () => {
    const navigate = useNavigate();

    const handleSubmit = (
        values: SearchFormValues
    ) => {
        const params =
            new URLSearchParams();

        params.set(
            "location",
            values.location
        );

        params.set(
            "checkIn",
            values.checkIn
        );

        params.set(
            "checkOut",
            values.checkOut
        );

        params.set(
            "guests",
            String(values.guests)
        );

        params.set(
            "rooms",
            String(values.rooms)
        );

        navigate(
            `/hotels?${params.toString()}`
        );
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={
                validationSchema
            }
            onSubmit={handleSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
            }) => (
                <Form className="search-form">
                    <div className="search-field">
                        <label htmlFor="location">
                            Location
                        </label>

                        <input
                            id="location"
                            name="location"
                            type="text"
                            placeholder="Where are you going?"
                            value={values.location}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        {touched.location &&
                            errors.location && (
                                <span>
                                    {errors.location}
                                </span>
                            )}
                    </div>

                    <div className="search-field">
                        <label htmlFor="checkIn">
                            Check-in
                        </label>

                        <input
                            id="checkIn"
                            name="checkIn"
                            type="date"
                            value={values.checkIn}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        {touched.checkIn &&
                            errors.checkIn && (
                                <span>
                                    {errors.checkIn}
                                </span>
                            )}
                    </div>

                    <div className="search-field">
                        <label htmlFor="checkOut">
                            Check-out
                        </label>

                        <input
                            id="checkOut"
                            name="checkOut"
                            type="date"
                            value={values.checkOut}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        {touched.checkOut &&
                            errors.checkOut && (
                                <span>
                                    {errors.checkOut}
                                </span>
                            )}
                    </div>

                    <div className="search-field">
                        <label htmlFor="guests">
                            Guests
                        </label>

                        <input
                            id="guests"
                            name="guests"
                            type="number"
                            min="1"
                            value={values.guests}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        {touched.guests &&
                            errors.guests && (
                                <span>
                                    {errors.guests}
                                </span>
                            )}
                    </div>

                    <div className="search-field">
                        <label htmlFor="rooms">
                            Rooms
                        </label>

                        <input
                            id="rooms"
                            name="rooms"
                            type="number"
                            min="1"
                            value={values.rooms}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        {touched.rooms &&
                            errors.rooms && (
                                <span>
                                    {errors.rooms}
                                </span>
                            )}
                    </div>

                    <button
                        type="submit"
                        className="search-button"
                    >
                        Search Hotels
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default SearchForm;