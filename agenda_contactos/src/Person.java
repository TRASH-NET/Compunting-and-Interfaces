public class Person {
    
    private String name;
    private String last_name;
    private String phone;
    private String email;

    public Person(String name, String last_name, String phone, String email) {
        if (name.matches("^[a-zA-Z]{1,20}$")) {
            this.name = name;
        } else {
            throw new IllegalArgumentException("El nombre debe contener solo letras y no puede tener espacios o caracteres especiales y debe tener entre 1 y 20 caracteres.");
        }

        if (last_name.matches("^[a-zA-Z]{1,20}$")) {
            this.last_name = last_name;
        } else {
            throw new IllegalArgumentException("El apellido debe contener solo letras y no puede tener espacios o caracteres especiales y debe tener entre 1 y 20 caracteres.");
        }

        if (phone.matches("^3[0-9]{9}$")) {
            this.phone = phone;
        } else {
            throw new IllegalArgumentException("El número de teléfono debe tener 10 dígitos y comenzar con 3.");
        }

        if (email.matches("^[\\w-\\.]+@[\\w-\\.]+\\.com$")) {
            this.email = email;
        } else {
            throw new IllegalArgumentException("El correo electrónico debe tener una estructura válida, como 'ejemplo@dominio.com'.");
        }
    }

    public String getName() {
        return this.name;
    }
    
    public String getLastName() {
        return this.last_name;
    }

    public String getPhone() {
        return this.phone;
    }

    public String getEmail() {
        return this.email;
    }

    public void setName(String name) {
        if (name.matches("^[a-zA-Z]{1,20}$")) {
            this.name = name;
        } else {
            throw new IllegalArgumentException("El nombre debe contener solo letras y no puede tener espacios o caracteres especiales y debe tener entre 1 y 20 caracteres.");
        }
    }

    public void setLastName(String last_name) {
        if (last_name.matches("^[a-zA-Z]{1,20}$")) {
            this.last_name = last_name;
        } else {
            throw new IllegalArgumentException("El apellido debe contener solo letras y no puede tener espacios o caracteres especiales y debe tener entre 1 y 20 caracteres.");
        }
    }

    public void setPhone(String phone) {
        if (phone.matches("^3\\d{9}$")) {
            this.phone = phone;
        } else {
            throw new IllegalArgumentException("El número de teléfono debe tener 10 dígitos y comenzar con 3.");
        }
    }

    public void setEmail(String email) {
        if (email.matches("^[\\w-\\.]+@[\\w-\\.]+\\.com$")) {
            this.email = email;
        } else {
            throw new IllegalArgumentException("El correo electrónico debe tener una estructura válida, como 'ejemplo@dominio.com'.");
        }
    }

    @Override
    public String toString() {
        return "{\n" +
               "    " + "name: " + "\"" + name + "\"" + "\n" +
               "    " + "last_name: " + "\"" + last_name + "\"" + "\n" +
               "    " + "phone: " + "\"" + phone + "\"" + "\n" +
               "    " + "email: " + "\"" + email + "\"" + "\n" +
               "}";
    }
}
