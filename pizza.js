$(document).ready(
    function () {
        // event handlers
        $("#tabs a").click(showTab);

        //when button on pizza selection page is submitted execute this function
        $("#pizzaDetails").submit(placeOrder);

        //when contact tab button is used on pizza submission page, make sure form is submitted
        //when we click the contact tab, execute the place order function
        $("#contactTab").click(placeOrder);

        //when order details tab is used on contact submission page, make sure form is submitted
        //when we click the order details tab, execute the send delivery information function
        $("#orderTab").click(sendDeliveryInformation).click(placeOrder);

        // use button on first tab to take us to the next page for delivery information
        $("#pizzaOrderButton").click(function() {
            $("#tabs a").eq(1).click();
        });

        //when button on delivery information page is submitted execute this function
        $("#deliveryInfo").submit(sendDeliveryInformation);


        //when we click the home tab, execute the send delivery information function to make sure it is saved
        $("#homeTab").click(sendDeliveryInformation);

        // use button on second tab to take us to the third tab for order summary
        $("#sendDeliveryInfo").click(function () {
            $("#tabs a").eq(2).click();
        });

        // other functions
        function showTab(event) {
            event.preventDefault();
            $(this).tab("show");
        }

        function placeOrder(event) {
            // Don't actually submit the form!
            // Stops the flashing/resetting
            event.preventDefault();

            // jQuery get the the size of the pizza that is selected
            var size = $("input[name=size]:checked").data("size");

            // jQuery get me the crust type of the pizza that is selected
            var crust = $("input[name=crust]:checked").val();

            // jQuery, get me every <input> where the name is "meat" and is checked
            var checkedMeatBoxes = $("input[name=meat]:checked");

            // Declare a variable to hold the meat names
            var meatNames = "";

            // For each checked box...
            checkedMeatBoxes.each(function () {
                //get the value attribute of the checkbox
                meatNames += $(this).val();
                meatNames += ", ";
            });

            // jQuery get me every <input> where the name is "non-meat" that are checked
            var checkedNonMeat = $("input[name=non-meat]:checked");

            // declare variable to hold the non-meat names
            var nonMeatNames = "";

            // for each checked box...
            checkedNonMeat.each(function () {
                //get the value attribute of the checkbox
                nonMeatNames += $(this).val();
                nonMeatNames += ", ";
            })

            // Calculate subtotal price of pizza
            var basePrice = $("input[name=size]:checked").data("price");
            var meatPrice = checkedMeatBoxes.length * 1.5;
            var nonMeatPrice = checkedNonMeat.length * 1;
            var subtotal = basePrice + meatPrice + nonMeatPrice;
            var subtotalDisplay = subtotal.toFixed(2);

            // Calculate tax
            var tax = subtotal * 0.051;
            var taxDisplay = tax.toFixed(2);

            // Set our delivery fee
            var deliveryFee = 2;
            var deliveryFeeDisplay = deliveryFee.toFixed(2);

            // calculate order total
            var orderTotal = subtotal + tax + 2;
            var orderTotalDisplay = orderTotal.toFixed(2);

            // update span with size
            $("#sizeDisplay").text(size);
            // update the order details with the crust type
            $("#crustDisplay").text(crust);
            // update span with meat names
            $("#meatDisplay").text(meatNames);
            // update span with non-meat names
            $("#non-meatDisplay").text(nonMeatNames);
            // update span with subtotal
            $("#pizzaSubtotal").text("$" + subtotalDisplay);
            // update span with tax
            $("#tax").text("$" + taxDisplay);
            // update delivery fee in case we want to change it later, it is not hard coded into the span
            $("#deliveryFee").text("$" + deliveryFeeDisplay);
            // update span with grand total
            $("#cost").text("$" + orderTotalDisplay);

        }

        function sendDeliveryInformation(event) {

            //don't actually submit the form
            event.preventDefault();

            // jQuery get me the name
            var name = $("#name").val();

            // jQuery get me the street address
            var streetAddress = $("#streetAddress").val();

            // jQuery get me the City
            var city = $("#city").val();

            // jQuery get me the state
            var state = $("#state").val();

            // jQuery get me the zipcode
            var zipCode = $("#zip").val();

            // jQuery get phone number
            var phoneNum = $("#phone").val();

            //stick the address all together
            var fullAddress = `${streetAddress}, ${city}, ${state} ${zipCode}`;

            /*
            Update our display information
             */
            $("#nameInfoDisplay").text(name);
            $("#contactInfoDisplay").text(fullAddress);
            $("#phoneNumberDisplay").text(phoneNum);

        }

    });