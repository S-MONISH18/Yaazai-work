#!/bin/bash
set -e
echo "Downloading system image..."
yes | /home/monish/Android/Sdk/cmdline-tools/latest/bin/sdkmanager "system-images;android-34;google_apis;x86_64"
echo "Creating AVD..."
echo "no" | /home/monish/Android/Sdk/cmdline-tools/latest/bin/avdmanager create avd -n test_avd -k "system-images;android-34;google_apis;x86_64" --device "pixel_4"
echo "AVD created."
