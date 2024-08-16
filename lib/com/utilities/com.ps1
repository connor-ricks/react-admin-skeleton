param(
    [string]$name,
    [string]$json = $null
)

# Check if the function name is provided.
if ($name -eq $null -or $name -eq "") {
    throw "A function name must be provided"
}

# Create an instance of the COM object
$com = New-Object -ComObject "testcom.TestCOM"

$output = $null

if ($json -eq $null -or $json -eq "") {
    # Call the function without JSON input.
    $output = $com.$name()
} else {
    # Call the function with JSON input.
    $output = $com.$name($json)
}

# Return the output.
Write-Output $output

# Release the COM object.
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($com)