"use client";
import { useState, ChangeEvent } from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CheckedState } from "@radix-ui/react-checkbox";
function PasswordGenerator() {
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumber, setIncludeNumber] = useState<boolean>(true);
  const [includeSymbol, setIncludeSymbol] = useState<boolean>(true);
  const [password, SetPassword] = useState<string>("");

  const handleLengthChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLength(Number(event.target.value));
  };
  const generatePassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMONPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmonpqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";
    let allChars = "";

    if (includeUppercase) allChars += uppercaseChars;
    if (includeLowercase) allChars += lowercaseChars;
    if (includeNumber) allChars += numberChars;
    if (includeSymbol) allChars += symbolChars;

    if (allChars === "") {
      alert("Please select at least one character type!");
      return;
    }

    let generatedPassword = "";
    for (let index = 0; index < length; index++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex];
    }
    SetPassword(generatedPassword);
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(
      () => {
        alert("Password Copied To Clipboard!");
      },
      () => {
        alert("Error: Failed To Copy Password To Clipboard!");
      }
    );
  };

  const handleCheckboxChange =
    (setter: (value: boolean) => void) =>
    (checked: CheckedState): void => {
      if (typeof checked === "boolean") {
        setter(checked);
      }
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Center the password generator card within the screen */}
      <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div className="mx-auto max-w-md space-y-6">
          {/* Header with title and description */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Password Generator</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Create a secure password with just a few clicks.
            </p>
          </div>
          {/* Main content area for password options and input */}
          <div className="space-y-4">
            {/* Input for password length */}
            <div className="space-y-2">
              <Label htmlFor="length">Password Length</Label>
              <Input
                id="length"
                type="number"
                min="8"
                max="32"
                value={length}
                onChange={handleLengthChange}
                className="w-full"
              />
            </div>
            {/* Checkboxes for character type inclusion */}
            <div className="space-y-2">
              <Label>Include:</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={handleCheckboxChange(setIncludeUppercase)}
                />
                <Label htmlFor="uppercase">Uppercase Letters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={handleCheckboxChange(setIncludeLowercase)}
                />
                <Label htmlFor="lowercase">Lowercase Letters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={includeNumber}
                  onCheckedChange={handleCheckboxChange(setIncludeNumber)}
                />
                <Label htmlFor="numbers">Numbers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={includeSymbol}
                  onCheckedChange={handleCheckboxChange(setIncludeSymbol)}
                />
                <Label htmlFor="symbols">Symbols</Label>
              </div>
            </div>
            {/* Button to generate password */}
            <Button type="button" className="w-full" onClick={generatePassword}>
              Generate Password
            </Button>
            {/* Display the generated password and button to copy */}
            <div className="space-y-2">
              <Label htmlFor="password">Generated Password</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="password"
                  type="text"
                  value={password}
                  readOnly
                  className="flex-1"
                />
                <Button type="button" onClick={copyToClipboard}>
                  Copy to Clipboard
                </Button>
              </div>
            </div>
          </div>
        </div>
        <CardFooter className="py-4 mx-0 px-0 ">
          Made By Hassaan Arain
        </CardFooter>
      </Card>
    </div>
  );
}
export default PasswordGenerator;
