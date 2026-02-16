cd /home/maxnchief/
sudo apt-get install unzip
wget https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip
unzip sdk-tools-linux-4333796.zip -d Android
rm sdk-tools-linux-4333796.zip
sudo apt-get install -y lib32z1 openjdk-8-jdk
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export PATH=$PATH:$JAVA_HOME/bin
printf "\n\nexport JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64\nexport PATH=\$PATH:\$JAVA_HOME/bin" >> ~/.bashrc
cd /home/maxnchief/Android/tools/bin
# Removed deprecated 'android update sdk --no-ui'
sudo apt-get install gradle
gradle -v
adb start-server

# Set variables
ANDROID_SDK_ROOT=/home/maxnchief/Android
export ANDROID_SDK_ROOT

# Install dependencies
sudo apt-get update
sudo apt-get install -y unzip lib32z1 openjdk-8-jdk gradle

# Download and unpack command-line tools
cd "$ANDROID_SDK_ROOT"
wget -O cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip
unzip -q cmdline-tools.zip
rm cmdline-tools.zip

# Ensure correct directory structure: move/rename cmdline-tools to tools inside cmdline-tools
if [ -d "cmdline-tools" ]; then
	# If already exists, move to tools
	if [ -d "cmdline-tools/tools" ]; then
		echo "cmdline-tools/tools already exists. Skipping move."
	else
		mv cmdline-tools cmdline-tools-tmp
		mkdir -p cmdline-tools
		mv cmdline-tools-tmp cmdline-tools/tools
	fi
fi

# Set JAVA_HOME and update PATH
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export PATH=$PATH:$JAVA_HOME/bin

# Add sdkmanager to PATH (tools and latest)
export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/cmdline-tools/tools/bin


# Persist environment variables in ~/.profile and ~/.bash_profile
for file in ~/.profile ~/.bash_profile; do
	echo "\n# Android SDK/Java environment" >> $file
	echo "export ANDROID_HOME=$ANDROID_SDK_ROOT/cmdline-tools/latest" >> $file
	echo "export ANDROID_SDK_ROOT=$ANDROID_SDK_ROOT" >> $file
	echo "export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64" >> $file
	echo "export PATH=\$PATH:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_HOME/bin" >> $file
done

# Install SDK packages
sdkmanager "platform-tools" "platforms;android-26" "build-tools;26.0.3"

# Start adb server
adb start-server

# Show gradle version
gradle -v