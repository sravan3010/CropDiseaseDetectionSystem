$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('.box').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#uploadFile").change(function () {
        $('.image-section').show();
        $('#analyze').show();
        $('.box').hide();
        readURL(this);
    });

    var bacterial_spot_data="Only use certified disease-free seeds and plants. Avoid areas that were planted with peppers or tomatoes during the previous year. Avoid overhead watering by using drip or furrow irrigation. Remove and dispose of all diseased plant material. Prune plants to promote air circulation. Spraying with a copper fungicide will give fairly good control of the bacterial disease. ";
    var early_blight_data="Use resistant or tolerant tomato cultivars. Use pathogen-free seed and do not set diseased plants in the field. Use crop rotation, eradicate weeds and volunteer tomato plants, space plants to not touch, mulch plants, fertilize properly, don’t wet tomato foliage with irrigation water, and keep the plants growing vigorously. Trim off and dispose of infected lower branches and leaves. To reduce disease severity, test the garden soil annually and maintain a sufficient level of potassium. Lime the soil according to soil test results. Side dress tomato plants monthly with calcium nitrate for adequate growth.";
    var late_blight_data="The following guidelines should be followed to minimize late blight problems: Keep foliage dry. Locate your garden where it will receive morning sun. Allow extra room between the plants, and avoid overhead watering, especially late in the day. Purchase certified disease-free seeds and plants. Destroy volunteer tomato and potato plants, as well as nightshade family weeds, such as Carolina horsenettle or black nightshade, which may harbor the fungus. Pull out and destroy diseased plants. If the disease is severe enough to warrant chemical control, select one of the following fungicides: chlorothalonil (very good), copper fungicide, or mancozeb (good).";
    var sepotoria_leaf_data=" Most currently grown tomato cultivars are susceptible to Septoria leaf spot. Crop rotation of 3 years and sanitation (removal of crop debris) will reduce the amount of inoculum. Do not use overhead irrigation. Repeated fungicide applications with chlorothalonil (very good) or copper fungicide, or mancozeb (good) will keep the disease in check.";
    var yellow_leaf_curl_data="Removal of plants with initial symptoms may slow the spread of the disease. Rogued (pulled out) infected plants should be immediately bagged to prevent the spread of the whiteflies feeding on those plants. Keep weeds controlled within and around the garden site, as these may be alternate hosts for whiteflies. Reflective mulches (aluminum or silver-colored) can be used in the rows to reduce whitefly feeding. Low concentration sprays of a horticultural oil or canola oil will act as a whitefly repellent, reduce feeding and possibly transmission of the virus. Use a 0.25 to 0.5% oil spray (2 to 4 teaspoons horticultural or canola oil & a few drops of dish soap per gallon of water) weekly.";
    var leaf_mould_data="Increasing air circulation by pruning, spacing, and staking tomato plants can control the disease. to increase air circulation helps to control the disease. Avoid watering overhead to keep leaves dry. Crop rotation is important. A preventative fungicide can be used";
    var mosaic_virus_data="Plant resistant varieties when available or purchase transplants from a reputable source. Spot treat with least-toxic, natural pest control products, such as Safer Soap, Bon-Neem, and diatomaceous earth, to reduce the number of disease-carrying insects. Remove all perennial weeds, using least-toxic herbicides, within 100 yards of your garden plot. The virus can be spread through human activity, tools, and equipment. Frequently wash your hands and disinfect garden tools, stakes, pots, greenhouse benches, etc. (one part bleach to 4 parts water) to reduce the risk of contamination. Avoid working in the garden during damp conditions (viruses are easily spread when plants are wet). Avoid using tobacco around susceptible plants.";
    var spider_mite_data="Mites like it hot, dry, and dusty. Hose off plants to cool and clean them. Hosing leaf undersides dislodge the mites. Reduce plant stress through proper watering and fertilizing practices avoid excessive nitrogen fertilization, which increases mite populations. Horticultural oil and insecticidal soap are most effective on mite eggs. Soap with pyrethrum can be used. Use when damage is first observed. Spray in early morning when it's cool and plants have rehydrated overnight. Caution: Spraying badly damaged leaves can cause further injury. Pull up and dispose of badly infested plants. Clean up overwintering sites, especially bean plant debris. Encourage predatory mites by avoiding toxic sprays. You can purchase predatory mites and release them into your garden to control pest mites.";
    var target_spot_data="Cultural practices for target spot management include improving airflow through the canopy by wider plant spacing and avoiding over-fertilizing with nitrogen, which can cause overly lush canopy formation. Pruning suckers and older leaves in the lower canopy can also increase airflow and reduce leaf wetness. Avoid planting tomatoes near old plantings. Inspect seedlings for target spot symptoms before transplanting. Manage weeds, which may serve as alternate hosts, and avoid the use of overhead irrigation. Destroy crop residues shortly after the final harvest, and rotate away from tomato and other known hosts for at least three years. Resistance to target spot is not available in commercial tomato varieties, although partial resistance has been observed in wild species of tomato.";
    var healthy_data="The leaf is Healthy!!!";

    // Predict
    $('#analyse').click(function () {
        var form_data = new FormData($('#myform')[0]);

        // Show loading animation
        $('.loader').show();
        $('#analyze').show();
        $('.box').show();

        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                $('.loader').hide();
                $('#result1').text(' Result:  ' + data[1]);
                $('#result2').text('Confidence: '+data[2]);
                if(data[0]==0)
                    $('#output_page').html('<p>'+bacterial_spot_data+'</p>');
                else if(data[0]==1)
                    $('#output_page').html('<p>'+early_blight_data+'</p>');
                else if(data[0]==2)
                    $('#output_page').html('<p>'+late_blight_data+'</p>');
                else if(data[0]==3)
                    $('#output_page').html('<p>'+leaf_mould_data+'</p>');
                else if(data[0]==4)
                    $('#output_page').html('<p>'+sepotoria_leaf_data+'</p>');
                else if(data[0]==5)
                    $('#output_page').html('<p>'+spider_mite_data+'</p>');
                else if(data[0]==6)
                    $('#output_page').html('<p>'+target_spot_data+'</p>');
                    else if(data[0]==7)
                    $('#output_page').html('<p>'+yellow_leaf_curl_data+'</p>');
                else if(data[0]==8)
                    $('#output_page').html('<p>'+mosaic_virus_data+'</p>');
                else if(data[0]==9)
                    $('#output_page').html('<p>'+healthy_data+'</p>');
                console.log('Success!');
            },
        });
    });

});

