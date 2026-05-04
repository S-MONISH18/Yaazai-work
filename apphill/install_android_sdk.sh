#!/bin/bash
set -e
echo "Creating SDK directories..."
mkdir -p /home/monish/Android/Sdk/cmdline-tools
cd /home/monish/Android/Sdk/cmdline-tools
echo "Downloading commandlinetools..."
wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O cmdline-tools.zip
echo "Unzipping..."
unzip -q cmdline-tools.zip
mv cmdline-tools latest
rm cmdline-tools.zip
echo "Accepting licenses and installing tools..."
yes | /home/monish/Android/Sdk/cmdline-tools/latest/bin/sdkmanager --licenses
/home/monish/Android/Sdk/cmdline-tools/latest/bin/sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0" "emulator"
echo "Android SDK installed successfully!"
