$(function() {

    // Chart your mark
    function youMark(results) {
        // Collect you Mark results
        var data = {};
        for (var i = 0, l = results.length; i<l; i++) {
            var youMarkResponse = results[i].responses[0];
            var k = String(youMarkResponse.answer);
            if (!data[k]) data[k] = 1;
            else data[k]++;
        }

        // Assemble for graph
        var labels = Object.keys(data);
        var dataSet = [];
        for (var k in data)
            dataSet.push(data[k]);

        // Render chart
        var ctx = document.getElementById('usefultoyouChart').getContext('2d');
        var usefultoyouChart = new Chart(ctx).Bar({
            labels: labels,
            datasets: [
                {
                    label: 'Mark',
                    data: dataSet
                }
            ]
        });
    }

    // Chart your community mark
    function yourCommunityMark(results) {
        // Collect you Mark results
        var data = {};
        for (var i = 0, l = results.length; i<l; i++) {
            var yourcommunityMarkResponse = results[i].responses[1];
            var k = String(yourcommunityMarkResponse.answer);
            if (!data[k]) data[k] = 1;
            else data[k]++;
        }

        // Assemble for graph
        var labels = Object.keys(data);
        var dataSet = [];
        for (var k in data)
            dataSet.push(data[k]);

        // Render chart
        var ctx = document.getElementById('usefultocommunityChart').getContext('2d');
        var usefultocommunityChart = new Chart(ctx).Bar({
            labels: labels,
            datasets: [
                {
                    label: 'Mark',
                    data: dataSet
                }
            ]
        });
    }


    // poor man's html template for a response table row
    function row(response) {
        var tpl = '<tr><td>';
        tpl += response.answer || 'pending...' + '</td>';
        if (response.recordingUrl) {
            tpl += '<td><a target="_blank" href="'
                + response.recordingUrl
                + '"><i class="fa fa-play"></i></a></td>';
        } else {
            tpl += '<td>N/A</td>';
        }
        tpl += '</tr>';
        return tpl;
    }

    // add text responses for obstacles to a table
    function obstaclesFreeText(results) {
        var $responses = $('#obstaclesResponses');
        var content = '';
        for (var i = 0, l = results.length; i<l; i++) {
            var obstaclesResponse = results[i].responses[2];
            content += row(obstaclesResponse);
        }
        $responses.append(content);
    }

    // add text responses for helper to a table
    function helperFreeText(results) {
        var $responses = $('#helperResponses');
        var content = '';
        for (var i = 0, l = results.length; i<l; i++) {
            var helperResponses = results[i].responses[3];
            content += row(helperResponses);
        }
        $responses.append(content);
    }

    // Load current results from server
    $.ajax({
        url: '/results',
        method: 'GET'
    }).done(function(data) {
        // Update charts and tables
        $('#total').html(data.results.length);
        youMark(data.results);
        yourCommunityMark(data.results);
        obstaclesFreeText(data.results);
        helperFreeText(data.results);
    }).fail(function(err) {
        console.log(err);
        alert('failed to load results data :(');
    });
});
