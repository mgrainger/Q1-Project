$(document).ready(function() {
    console.log('JS is running');
    $('form').submit(function(event) {
        event.preventDefault();
        googleURL = 'https://galvanize-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=39.7392,-104.9903&radius=50000&type=point_of_interest&name=golf&key=AIzaSyBal-9gGmp4_CHaeKlr9_UN7kA-zywr1QU';
        nextPage = 'https://galvanize-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=CpQCDwEAAFNYWyKxy5fcR1tQvo3DZqkTLdMDvf9cexgc58AtvP4KTlBpAVMoIsHds1-2dXB7ZAJlokBB3RkdDK3OqrRgxjKl79bMRRnM7CHqyj2-qSEKUi_hslDo4Te7Vv81oH4C1B0_j5ZqXJwrrow8j-cQXvFSDnqEE1bN33ILCsOU4QKeE0pFrRdcBEqtlJT91kVpNQ5A6eniSmm_fbAoZxFjSz2nLEI6a1dp0NftXYW2kcxIj93S5NrQ8N8sgumFGPLqjzMAYpkBnuazDKZuZd9G21_8mx43Lp4Egx0Z8CeIMWQWyTh4JfhxK8yX3Cnr5I1yid1mssnG_x5D3uAUa3Z1T-rIKe3INgu4NLj251uO-tSvEhA1Pu8vynknSfC9dY_FenVPGhQ8P-VkjeVQUjqAVA200KFnC4LhRg&key=AIzaSyBal-9gGmp4_CHaeKlr9_UN7kA-zywr1QU';
        lastPage = 'https://galvanize-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=CpQCDwEAAFNYWyKxy5fcR1tQvo3DZqkTLdMDvf9cexgc58AtvP4KTlBpAVMoIsHds1-2dXB7ZAJlokBB3RkdDK3OqrRgxjKl79bMRRnM7CHqyj2-qSEKUi_hslDo4Te7Vv81oH4C1B0_j5ZqXJwrrow8j-cQXvFSDnqEE1bN33ILCsOU4QKeE0pFrRdcBEqtlJT91kVpNQ5A6eniSmm_fbAoZxFjSz2nLEI6a1dp0NftXYW2kcxIj93S5NrQ8N8sgumFGPLqjzMAYpkBnuazDKZuZd9G21_8mx43Lp4Egx0Z8CeIMWQWyTh4JfhxK8yX3Cnr5I1yid1mssnG_x5D3uAUa3Z1T-rIKe3INgu4NLj251uO-tSvEhA1Pu8vynknSfC9dY_FenVPGhQ8P-VkjeVQUjqAVA200KFnC4LhRg&key=AIzaSyBal-9gGmp4_CHaeKlr9_UN7kA-zywr1QU';
        finalPage = 'https://galvanize-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=CrQDrwEAADwAIOdgjy740qANCVRWAvUTPWgRBM8aqSYcscY0BMa6G7XWmGNJqQ4d14eKims9Tffwqk10q3iKB2glmpgcjwfrpGQ8loUmtqrZflN9NmkRxVqLkmxz7WbUMXtoTw8FN8HvBTBg4yfxwB9HSadfKdg-fKxWrezRGOeSBtOCLakP3DktqlfAwkXlAgzCxn0IPWNgpBH1mT_GipY72qKP205QQyyZC0YPxTr8gTXhdV68zPU-QV9VGWKuSyD9CL4rbdaIvWm_OI2ohpzlApDO7HaUp--cODvsSae-j-fIEaOkJ91zq773HXbdcWoEGg8WbaiD0PcBKDQIWyulT6-ivNE0_Sh74RPWsGdLDDF2vRgM_7EzkngyArV7UGvftdq0ia5A-YxIZ6xLGrOwFwSG66Hhb4lyDiqvnBuGIr2zxMTErdXMelnj96BC966k0kFf6OmyO-tZ7Ong9KLN63Iir695LG9tA7NXTCKJkjyL1eRtV6hSmf87TwzeOLF2DVrE_UE_fKPjwv4hCDEomZowNITZu4TCgwPw70pNw22cBCpEDH4NSTi7jNiRupHaf6DAAxIQGExeHmDmdHMMEATFrsjPMRoU65OPC632HLo-LMiiT7mauaCqLis&key=AIzaSyBal-9gGmp4_CHaeKlr9_UN7kA-zywr1QU';
        swingAPI = 'https://api.swingbyswing.com/v2/courses/search_by_location?lat=39.7&lng=-104.9&radius=100&active_only=yes&hole_count=18&from=1&access_token=9a7a612e-4ccf-4deb-a2da-cde8bc46db01';


        // $.ajax({
        //     url: googleURL,
        //     type: "GET",
        //     dataType: 'json',
        //     success: function listCourses(data) {
        //         var courses = data.results;
        //         for (var i = 0; i < courses.length; i++) {
        //             console.log(courses[i].name);
        //         }
        //     }
        // });
        // $.ajax({
        //     url: nextPage,
        //     type: 'GET',
        //     dataType: 'json',
        //     success: function listMoreCourses(data) {
        //         var courses2 = data.results;
        //         for (var i = 0; i < courses2.length; i++) {
        //             console.log(courses2[i].name);
        //         }
        //     }
        // });
        // $.ajax({
        //     url: lastPage,
        //     type: 'GET',
        //     dataType: 'json',
        //     success: function listMoreCourses(data) {
        //         var courses3 = data.results;
        //         for (var i = 0; i < courses3.length; i++) {
        //             console.log(courses3[i].name);
        //         }
        //     }
        // });
        // $.ajax({
        //     url: finalPage,
        //     type: 'GET',
        //     dataType: 'json',
        //     success: function listMoreCourses(data) {
        //         var courses4 = data.results;
        //         for (var i = 0; i < courses4.length; i++) {
        //             console.log(courses4[i].name);
        //         }
        //     }
        // });
        $.ajax({
            url: swingAPI,
            type: 'GET',
            dataType: 'json',
            success: function listMoreCourses(data) {
                var courses5 = data.courses;
                for (var i = 0; i < courses5.length; i++) {
                    console.log(courses5[i].name);
                }
            }
        });
    });
});

$(document).ready(function() {
    $('select').material_select();
});
