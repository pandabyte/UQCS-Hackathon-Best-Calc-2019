class BinaryNumberCalc{
    add(a, b) {
        if (!this.validate_is_binary(a) && !this.validate_is_binary(b)) {
            throw "error - not binary input";
        }
        return parseInt(this.binary_to_decimal(a)) + parseInt(this.binary_to_decimal(b));
    }

    subtract(a, b) {
        if (!this.validate_is_binary(a) && !this.validate_is_binary(b)) {
            throw "error - not binary input";
        }
        return parseInt(this.binary_to_decimal(a)) - parseInt(this.binary_to_decimal(b));
    }

    multiple(a, b) {
        if (!this.validate_is_binary(a) && !this.validate_is_binary(b)) {
            throw "error - not binary input";
        }
        return this.binary_to_decimal(a) * this.binary_to_decimal(b);
    }

    divide(a, b) {
        if (!this.validate_is_binary(a) && !this.validate_is_binary(b)) {
            throw "error - not binary input";
        }
        return this.binary_to_decimal(a) / this.binary_to_decimal(b);
    }

    binary_to_decimal(number) {
        return parseInt(number, 2).toString(10);
    }

    decimal_to_binary(number) {
        return (dec >>> 0).toString(2);
    }

    validate_is_binary(number) {
        if (!this.validate_is_number(number)) {
            console.log("ASD");
            return false;
        }
        let numberArr = number.toString().split("");
        for (let i = 0; i < numberArr.length; i++) {
            if (parseInt(numberArr[i]) != 1 && parseInt(numberArr[i]) != 0) {
                return false;
            }
        }
        return true;
    }

    validate_is_number(number) {
        return !isNaN(number);
    }
}

const binaryNumberCalc = new BinaryNumberCalc();